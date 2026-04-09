# Portfolio

Bu proje Next.js tabanli kisisel portfolio uygulamasidir.

## Kurulum

```bash
npm install
cp .env.example .env.local
```

`.env.local` icine MongoDB, NextAuth ve Cloudinary bilgilerini gir.

**Admin sifre (onerilen):** bcrypt hash'ini **base64** olarak sakla; `$` sorunu olmaz.

```bash
cd portfolio
node -e "const b=require('bcryptjs'); const h=b.hashSync('BURAYA_SIFRE',10); process.stdout.write(Buffer.from(h,'utf8').toString('base64')+'\n');"
```

Ciktiyi `.env.local` icine yapistir:

```env
ADMIN_PASSWORD_HASH_B64=................................
```

Alternatif: duz bcrypt satirini `ADMIN_PASSWORD_HASH='$2b$10$...'` seklinde tek tirnakla verebilirsin.

## Calistirma

```bash
npm run dev
```

## Admin Paneli

- Giris: `/tr/admin/login` veya `/en/admin/login`
- Panel: `/tr/admin` veya `/en/admin`
- Proje ve deneyim kayitlari MongoDB uzerinden yonetilir.
- Proje gorselleri Cloudinary'ye yuklenir.
- Deneyim listesi bossken panelde **varsayilan uc deneyimi yukle** ile veya asagidaki komutla ilk veriler eklenebilir.

```bash
npm run seed:experiences
```

## Komutlar

```bash
npm run lint
npm run build
npm run start
npm run seed:experiences
```
