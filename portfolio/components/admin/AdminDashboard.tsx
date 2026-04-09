'use client'

import { BriefcaseIcon, RectangleStackIcon } from '@heroicons/react/24/outline'
import { FormEvent, useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import type { ExperienceItem, ProjectItem } from '@/types/content'

type AdminDashboardProps = {
  locale: string
}

type AdminSection = 'projects' | 'experiences'

const emptyProject = { title: '', subtitle: '', category: '', imageUrl: '', projectUrl: '', order: 0 }
const emptyExperience = {
  title: '',
  company: '',
  period: '',
  location: '',
  website: '',
  description: '',
  skills: '',
  order: 0
}

const navItemClass = {
  base: 'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-base transition-colors min-h-[48px]',
  inactive: 'text-text-secondary hover:bg-primary/80 hover:text-text-primary',
  active: 'bg-cyan-600/20 text-text-primary ring-1 ring-cyan-500/40'
}

export default function AdminDashboard({ locale }: AdminDashboardProps) {
  const [section, setSection] = useState<AdminSection>('projects')
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [experiences, setExperiences] = useState<ExperienceItem[]>([])
  const [projectForm, setProjectForm] = useState(emptyProject)
  const [experienceForm, setExperienceForm] = useState(emptyExperience)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [seedBusy, setSeedBusy] = useState(false)
  const [seedInfo, setSeedInfo] = useState<string | null>(null)

  const fetchData = async () => {
    const [projectsResponse, experiencesResponse] = await Promise.all([
      fetch('/api/projects', { cache: 'no-store' }),
      fetch('/api/experiences', { cache: 'no-store' })
    ])

    const projectData = (await projectsResponse.json()) as ProjectItem[]
    const experienceData = (await experiencesResponse.json()) as ExperienceItem[]
    setProjects(projectData)
    setExperiences(experienceData)
  }

  useEffect(() => {
    void fetchData()
  }, [])

  const handleProjectSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const targetUrl = editingProjectId ? `/api/projects/${editingProjectId}` : '/api/projects'
    const method = editingProjectId ? 'PUT' : 'POST'

    await fetch(targetUrl, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectForm)
    })

    setProjectForm(emptyProject)
    setEditingProjectId(null)
    await fetchData()
  }

  const handleExperienceSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const targetUrl = editingExperienceId ? `/api/experiences/${editingExperienceId}` : '/api/experiences'
    const method = editingExperienceId ? 'PUT' : 'POST'
    const payload = {
      ...experienceForm,
      skills: experienceForm.skills.split(',').map((item) => item.trim()).filter(Boolean)
    }

    await fetch(targetUrl, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    setExperienceForm(emptyExperience)
    setEditingExperienceId(null)
    await fetchData()
  }

  const uploadImage = async (file: File) => {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    const data = (await response.json()) as { url?: string }
    setUploading(false)

    const uploadedUrl = data.url
    if (typeof uploadedUrl === 'string') {
      setProjectForm((prev) => ({ ...prev, imageUrl: uploadedUrl }))
    }
  }

  const deleteProject = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    await fetchData()
  }

  const deleteExperience = async (id: string) => {
    await fetch(`/api/experiences/${id}`, { method: 'DELETE' })
    await fetchData()
  }

  const seedDefaultExperiences = async () => {
    setSeedBusy(true)
    setSeedInfo(null)
    try {
      const res = await fetch('/api/admin/seed-experiences', { method: 'POST' })
      const data = (await res.json()) as { message?: string; skipped?: boolean }
      if (!res.ok) {
        setSeedInfo(data.message ?? 'Istek basarisiz.')
        return
      }
      await fetchData()
      setSeedInfo(data.message ?? 'Tamam.')
    } catch {
      setSeedInfo('Baglanti hatasi.')
    } finally {
      setSeedBusy(false)
    }
  }

  const inputClass =
    'w-full min-h-[44px] rounded-md bg-primary border border-border px-3 py-2.5 text-base text-text-primary placeholder:text-text-secondary/70'

  const SectionNav = () => (
    <>
      <button
        type="button"
        onClick={() => setSection('projects')}
        className={`${navItemClass.base} ${section === 'projects' ? navItemClass.active : navItemClass.inactive}`}
        aria-current={section === 'projects' ? 'page' : undefined}
      >
        <RectangleStackIcon className="h-6 w-6 shrink-0" aria-hidden />
        <span className="font-medium">Projeler</span>
        <span className="ml-auto rounded-full bg-primary/60 px-2 py-0.5 text-xs text-text-secondary">{projects.length}</span>
      </button>
      <button
        type="button"
        onClick={() => setSection('experiences')}
        className={`${navItemClass.base} ${section === 'experiences' ? navItemClass.active : navItemClass.inactive}`}
        aria-current={section === 'experiences' ? 'page' : undefined}
      >
        <BriefcaseIcon className="h-6 w-6 shrink-0" aria-hidden />
        <span className="font-medium">Deneyimler</span>
        <span className="ml-auto rounded-full bg-primary/60 px-2 py-0.5 text-xs text-text-secondary">{experiences.length}</span>
      </button>
    </>
  )

  return (
    <main className="min-h-screen bg-primary pb-10 pt-20 sm:pb-12 sm:pt-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
        <header className="mb-6 flex flex-col gap-4 border-b border-border pb-6 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Admin</h1>
            <p className="mt-1 text-sm text-text-secondary">Portfolyo icerigini buradan yonet</p>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: `/${locale}/admin/login` })}
            className="min-h-[44px] w-full shrink-0 rounded-lg border border-border px-4 py-2.5 text-base text-text-primary hover:bg-card-bg sm:w-auto"
          >
            Cikis yap
          </button>
        </header>

        {/* Mobil: bolüm secici */}
        <div
          className="mb-6 flex gap-2 rounded-xl border border-border bg-card-bg p-1.5 lg:hidden"
          role="tablist"
          aria-label="Yonetim bolumu"
        >
          <button
            type="button"
            role="tab"
            aria-selected={section === 'projects'}
            onClick={() => setSection('projects')}
            className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors ${
              section === 'projects' ? 'bg-cyan-600 text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <RectangleStackIcon className="h-5 w-5" />
            Projeler
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={section === 'experiences'}
            onClick={() => setSection('experiences')}
            className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors ${
              section === 'experiences' ? 'bg-cyan-600 text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <BriefcaseIcon className="h-5 w-5" />
            Deneyimler
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* Masaustu sidebar */}
          <aside
            className="hidden w-56 shrink-0 lg:block xl:w-64"
            aria-label="Yonetim menusu"
          >
            <nav className="sticky top-24 space-y-1 rounded-xl border border-border bg-card-bg p-2 shadow-lg shadow-black/20">
              <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-text-secondary">Bolum</p>
              <SectionNav />
            </nav>
          </aside>

          {/* Icerik */}
          <div className="min-w-0 flex-1 space-y-8">
            {section === 'projects' && (
              <>
                <section className="rounded-xl border border-border bg-card-bg p-4 sm:p-6">
                  <h2 className="mb-1 text-lg font-semibold text-text-primary sm:text-xl">
                    {editingProjectId ? 'Projeyi guncelle' : 'Yeni proje'}
                  </h2>
                  <p className="mb-4 text-sm text-text-secondary">Gorsel, baslik ve istege bagli dis baglanti</p>
                  <form onSubmit={handleProjectSubmit} className="space-y-3">
                    <input className={inputClass} placeholder="Baslik" value={projectForm.title} onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))} required />
                    <input className={inputClass} placeholder="Alt baslik" value={projectForm.subtitle} onChange={(e) => setProjectForm((p) => ({ ...p, subtitle: e.target.value }))} />
                    <input className={inputClass} placeholder="Kategori" value={projectForm.category} onChange={(e) => setProjectForm((p) => ({ ...p, category: e.target.value }))} />
                    <input className={inputClass} placeholder="Sira" type="number" value={projectForm.order} onChange={(e) => setProjectForm((p) => ({ ...p, order: Number(e.target.value) }))} />
                    <input className={inputClass} placeholder="Gorsel URL" value={projectForm.imageUrl} onChange={(e) => setProjectForm((p) => ({ ...p, imageUrl: e.target.value }))} required />
                    <input className={inputClass} placeholder="Proje linki (https://...)" value={projectForm.projectUrl} onChange={(e) => setProjectForm((p) => ({ ...p, projectUrl: e.target.value }))} />
                    <input
                      type="file"
                      accept="image/*"
                      className="block w-full min-h-[44px] text-sm text-text-secondary file:mr-3 file:rounded-md file:border-0 file:bg-slate-700 file:px-3 file:py-2 file:text-sm file:text-white"
                      onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadImage(file) }}
                    />
                    {uploading && <p className="text-sm text-text-secondary">Gorsel yukleniyor...</p>}
                    <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
                      <button type="submit" className="min-h-[44px] w-full rounded-lg bg-cyan-600 px-4 py-2.5 text-base font-semibold text-white hover:bg-cyan-500 sm:w-auto">
                        {editingProjectId ? 'Guncelle' : 'Ekle'}
                      </button>
                      {editingProjectId && (
                        <button
                          type="button"
                          className="min-h-[44px] rounded-lg border border-border px-4 text-sm text-text-secondary hover:bg-primary"
                          onClick={() => {
                            setEditingProjectId(null)
                            setProjectForm(emptyProject)
                          }}
                        >
                          Iptal
                        </button>
                      )}
                    </div>
                  </form>
                </section>

                <section className="rounded-xl border border-border bg-card-bg p-4 sm:p-6">
                  <h3 className="mb-4 text-base font-semibold text-text-primary sm:text-lg">Kayitli projeler</h3>
                  <div className="space-y-3">
                    {projects.length === 0 && (
                      <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-text-secondary">Henuz proje yok</p>
                    )}
                    {projects.map((item) => (
                      <div key={item._id} className="rounded-lg border border-border p-3 sm:p-4">
                        <p className="break-words font-semibold">{item.title}</p>
                        <p className="break-words text-sm text-text-secondary">{item.category}</p>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-3">
                          <button type="button" className="min-h-[44px] flex-1 rounded-md bg-slate-700 px-3 py-2 text-sm text-white sm:min-h-0 sm:flex-none sm:px-4" onClick={() => {
                            setEditingProjectId(item._id)
                            setProjectForm({
                              title: item.title,
                              subtitle: item.subtitle,
                              category: item.category,
                              imageUrl: item.imageUrl,
                              projectUrl: item.projectUrl ?? '',
                              order: item.order
                            })
                            setSection('projects')
                          }}>
                            Duzenle
                          </button>
                          <button type="button" className="min-h-[44px] flex-1 rounded-md bg-red-700/90 px-3 py-2 text-sm text-white hover:bg-red-700 sm:min-h-0 sm:flex-none sm:px-4" onClick={() => void deleteProject(item._id)}>
                            Sil
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {section === 'experiences' && (
              <>
                <section className="rounded-xl border border-border bg-card-bg p-4 sm:p-6">
                  <h2 className="mb-1 text-lg font-semibold text-text-primary sm:text-xl">
                    {editingExperienceId ? 'Deneyimi guncelle' : 'Yeni deneyim'}
                  </h2>
                  <p className="mb-4 text-sm text-text-secondary">Is gecmisi satirlari</p>
                  <form onSubmit={handleExperienceSubmit} className="space-y-3">
                    <input className={inputClass} placeholder="Pozisyon" value={experienceForm.title} onChange={(e) => setExperienceForm((p) => ({ ...p, title: e.target.value }))} required />
                    <input className={inputClass} placeholder="Sirket" value={experienceForm.company} onChange={(e) => setExperienceForm((p) => ({ ...p, company: e.target.value }))} required />
                    <input className={inputClass} placeholder="Donem" value={experienceForm.period} onChange={(e) => setExperienceForm((p) => ({ ...p, period: e.target.value }))} required />
                    <input className={inputClass} placeholder="Konum" value={experienceForm.location} onChange={(e) => setExperienceForm((p) => ({ ...p, location: e.target.value }))} required />
                    <input className={inputClass} placeholder="Web sitesi" value={experienceForm.website} onChange={(e) => setExperienceForm((p) => ({ ...p, website: e.target.value }))} />
                    <textarea className={`${inputClass} min-h-[120px] resize-y`} placeholder="Aciklama" value={experienceForm.description} onChange={(e) => setExperienceForm((p) => ({ ...p, description: e.target.value }))} required />
                    <input className={inputClass} placeholder="Yetenekler (virgulle)" value={experienceForm.skills} onChange={(e) => setExperienceForm((p) => ({ ...p, skills: e.target.value }))} />
                    <input className={inputClass} placeholder="Sira" type="number" value={experienceForm.order} onChange={(e) => setExperienceForm((p) => ({ ...p, order: Number(e.target.value) }))} />
                    <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
                      <button type="submit" className="min-h-[44px] w-full rounded-lg bg-cyan-600 px-4 py-2.5 text-base font-semibold text-white hover:bg-cyan-500 sm:w-auto">
                        {editingExperienceId ? 'Guncelle' : 'Ekle'}
                      </button>
                      {editingExperienceId && (
                        <button
                          type="button"
                          className="min-h-[44px] rounded-lg border border-border px-4 text-sm text-text-secondary hover:bg-primary"
                          onClick={() => {
                            setEditingExperienceId(null)
                            setExperienceForm(emptyExperience)
                          }}
                        >
                          Iptal
                        </button>
                      )}
                    </div>
                  </form>
                </section>

                {experiences.length === 0 && (
                  <section className="rounded-xl border border-cyan-500/35 bg-cyan-950/25 p-4 sm:p-5">
                    <h3 className="text-base font-semibold text-text-primary sm:text-lg">Varsayilan deneyimleri yukle</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      Daha once sitede gorunen uc kayit (Mantis, SmartPulse, CBU Blockchain) veritabanina eklenir.
                      Yalnizca liste tamamen bossa calisir; tekrar tiklamazsan cift kayit olmaz.
                    </p>
                    <button
                      type="button"
                      disabled={seedBusy}
                      onClick={() => void seedDefaultExperiences()}
                      className="mt-4 min-h-[44px] w-full rounded-lg border border-cyan-500/50 bg-cyan-600/20 px-4 py-2.5 text-sm font-semibold text-cyan-200 hover:bg-cyan-600/30 disabled:opacity-60 sm:w-auto"
                    >
                      {seedBusy ? 'Yukleniyor...' : 'Uc deneyimi veritabanina ekle'}
                    </button>
                    {seedInfo && <p className="mt-3 text-sm text-text-secondary">{seedInfo}</p>}
                  </section>
                )}

                <section className="rounded-xl border border-border bg-card-bg p-4 sm:p-6">
                  <h3 className="mb-4 text-base font-semibold text-text-primary sm:text-lg">Kayitli deneyimler</h3>
                  <div className="space-y-3">
                    {experiences.length === 0 && (
                      <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-text-secondary">Henuz deneyim yok — yukaridaki formdan ekleyebilir veya varsayilanlari yukleyebilirsin.</p>
                    )}
                    {experiences.map((item) => (
                      <div key={item._id} className="rounded-lg border border-border p-3 sm:p-4">
                        <p className="break-words font-semibold">{item.title} @ {item.company}</p>
                        <p className="break-words text-sm text-text-secondary">{item.period}</p>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-3">
                          <button type="button" className="min-h-[44px] flex-1 rounded-md bg-slate-700 px-3 py-2 text-sm text-white sm:min-h-0 sm:flex-none sm:px-4" onClick={() => {
                            setEditingExperienceId(item._id)
                            setExperienceForm({
                              title: item.title,
                              company: item.company,
                              period: item.period,
                              location: item.location,
                              website: item.website,
                              description: item.description,
                              skills: item.skills.join(', '),
                              order: item.order
                            })
                            setSection('experiences')
                          }}>
                            Duzenle
                          </button>
                          <button type="button" className="min-h-[44px] flex-1 rounded-md bg-red-700/90 px-3 py-2 text-sm text-white hover:bg-red-700 sm:min-h-0 sm:flex-none sm:px-4" onClick={() => void deleteExperience(item._id)}>
                            Sil
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
