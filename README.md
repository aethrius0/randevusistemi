🚗 AutoWash - Randevu & Rezervasyon Sistemi

Bu proje, araç yıkama randevu sistemini hem web hem de mobil platformda yönetmek amacıyla geliştirilmiştir.
Kullanıcılar kayıt olabilir, giriş yapabilir ve uygun tarih/saat seçerek randevu oluşturabilir.

🌐 Frontend Tasarım Durumu
🔐 Login-Register Sistemi

HTML, CSS, JS ile kodlandı. Uygulamayı başlattığımızda ilk başta karşımıza bir login-register ekranı çıkıyor.

<img width="70%" src="https://github.com/user-attachments/assets/82fb11cc-58d4-42e5-a426-45a54708cbf6" />

Kayıt olmak istediğiniz takdirde "Kayıt ol" butonuna basarak ad, soyad, e-posta, telefon ve şifrenizi girerek güvenli bir şekilde kaydolabilirsiniz.

<img width="70%" src="https://github.com/user-attachments/assets/096a332e-3d4f-46ab-9957-e8a00bd22a9c" />
🗺️ Ana Sayfa Kısmı

Kayıt olup giriş yaptıktan sonra karşımıza büyükçe bir Türkiye haritası geliyor. Bu harita üzerinden randevu almak istediğiniz bayiyi seçebilme imkanı sunulur.
Sitedeki alt butonlar sayesinde randevular ve profil sayfanıza geçiş yapabilirsiniz.

<img width="70%" src="https://github.com/user-attachments/assets/17067188-7181-4878-a803-cb7766beb558" />
📅 Randevular Kısmı

Randevu oluşturma → araç plakası, hizmet türü, tarih-saat seçimi.

Oluşturulan randevuların sağında Düzenle / Sil butonları bulunur.

<img width="70%" src="https://github.com/user-attachments/assets/1fc8a4f8-7398-4d22-b78e-528d34de242d" />
👤 Profil Kısmı

Kullanıcı bilgileri gösterilir (Ad Soyad, e-posta, telefon).
Çıkış yap butonu sağ üsttedir.

<img width="70%" src="https://github.com/user-attachments/assets/0dfb6f2a-98d9-4c87-8dea-822ac9e8d6c2" />
🛠 Backend
🔐 Login-Register Sistemi

Kullanıcı giriş–kayıt işlemleri için ASP.NET Core Web API üzerinde çalışan bir Authentication Controller (AuthController) geliştirilmiştir.

[HttpPost("register")]
public IActionResult Register([FromBody] User user)

[HttpPost("login")]
public IActionResult Login([FromBody] LoginRequest request)

🗄 Veritabanı

Kullanıcı bilgileri MySQL üzerinde şu alanlara saklanmaktadır:

Id

Name

Email

Phone

Password

🔌 Swagger UI Sistemi

Backend geliştirirken kolaylık sağlaması için Swagger UI aktif edilmiştir.

Tüm endpointler listelenir

Request–Response gösterilir

API çağrıları direkt tarayıcıdan test edilir

<img width="70%" src="https://github.com/user-attachments/assets/efbc69e7-4438-485e-9027-92ef07f66857" />
🔗 Frontend – API Entegrasyonu

Web tarafı backend ile şu şekilde haberleşir:

const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
});

🧾 Sonuç

Kısaca Backend'in Frontend ile entegrasyonu, API aracılığıyla bağlantıların kurulması, veritabanı entegrasyonu, login-register sistemi ve randevu alma sisteminin başarılı şekilde gerçekleşmesi sayesinde randevu ve rezervasyon sistemi projesinin kısmen tamamlandığını söylenebilir.
Geri kalan zamanda arayüz güncellemeleri ve admin paneli oluşturularak birtakım eksiklikler düzeltilecektir.
