Proje Adı: AutoWash - Randevu & Rezervasyon Sistemi 

Bu proje, araç yıkama randevu sistemini hem web hem de mobil platformda yönetmek amacıyla geliştirilmiştir.
Kullanıcılar kayıt olabilir, giriş yapabilir ve uygun tarih/saat seçerek randevu oluşturabilir.

Proje Tasarım Durumu:
Frontend:
  Login-Register Sistemi:
    HTML, CSS, JS ile kodlandı. Uygulamayı başlattığımızda ilk başta karşımıza bir login-register ekranı çıkıyor.
    <img width="1920" height="906" alt="image" src="https://github.com/user-attachments/assets/82fb11cc-58d4-42e5-a426-45a54708cbf6" />
    Kayıt olmak istediğiniz takdirde "Kayıt ol" butonuna basarak ad, soyad, e-posta, telefon ve şifrenizi girerek güvenli bir şekilde kaydolabilirsiniz.
    <img width="1919" height="934" alt="image" src="https://github.com/user-attachments/assets/096a332e-3d4f-46ab-9957-e8a00bd22a9c" />

  Ana Sayfa Kısmı:
    Kayıt olup giriş yaptıktan sonra karşımıza büyükçe bir Türkiye haritası geliyor. Bu harita üzerinden randevu almak istediğiniz bayiyi seçebilme imkanı sunulur.
    Sitedeki alt butonlar sayesinde randevular ve profil sayfanıza geçiş yapabilirsiniz. Sağ üst köşeden ya da profil kısmında çıkış yap butonuyla çıkış yapabilirsiniz.
    Sol üstteki "+" ve "-" butonlarıyla haritayı büyütüp küçültebilirsiniz.
    <img width="1920" height="921" alt="image" src="https://github.com/user-attachments/assets/17067188-7181-4878-a803-cb7766beb558" />
  Randevular Kısmı:
    Randevular sekmesine geldiğimizde karşımıza basit bir randevu oluşturma kısmı geliyor. Randevu oluştururken ilk başta araç plakası girilir, devamında arabaya yapılacak hizmetin türü seçilir.
    Ardından tarih ve saat seçildikten sonra "Randevu Al" butonuna basılır ve randevu başarıyla oluşturulur.
    Ayrıca oluşturduğumuz randevunun sağında bulunan "Düzenle" ve "Sil" butonlarını kullanarak randevuyu düzenleyebilir veya silebiliriz.
    <img width="1920" height="915" alt="image" src="https://github.com/user-attachments/assets/1fc8a4f8-7398-4d22-b78e-528d34de242d" />
  Profil Kısmı:
    Profil kısmına geldiğimizde önümüze basit bir ad-soyad, e-posta ve telefon numarası bilgilerinin görüleceği kısım karşımıza çıkıyor.
    Sağ üstte başta da dediğimiz gibi "Çıkış Yap" butonu ortaya çıkıyor. Butona basarak çıkış yapabilirsiniz.
    <img width="1920" height="917" alt="image" src="https://github.com/user-attachments/assets/0dfb6f2a-98d9-4c87-8dea-822ac9e8d6c2" />

Backend:
  Login-Register Sistemi:
    Kullanıcı giriş–kayıt işlemleri için ASP.NET Core Web API üzerinde çalışan bir Authentication Controller (AuthController) geliştirilmiştir. 
      - HttpPost("register")]
          public IActionResult Register([FromBody] User user)
      - [HttpPost("login")]
          public IActionResult Login([FromBody] LoginRequest request) 
  Veritabanı Sistemi:
    Kimlik doğrulama sistemi için MySQL üzerinde Users tablosu oluşturulmuştur. Her kullanıcı şu alanlarla saklanmaktadır:
      -Id	    Kullanıcı birincil anahtarı
      -Name	  Ad Soyad
      -Email	Kullanıcı email adresi
      -Phone	Telefon
      -Password	Parola
  API Sistemi:
    Kullanıcı kayıt ve giriş işlemleri REST API üzerinden gerçekleşir.
    Swagger UI ile bu endpointler kolayca test edilebilmektedir.
    -  [HttpPost("register")]
         public IActionResult Register([FromBody] User user)
    - [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
  Swagger UI Sistemi:
    Backend geliştirirken ve test ortamında kolaylık sağlaması için Swagger UI aktif edilmiştir.
    Özellikler:
      -Tüm endpointler listelenir
      -Request–Response gövdesi canlı gösterilir
      -API çağrıları direkt tarayıcıdan test edilir
    <img width="1920" height="921" alt="image" src="https://github.com/user-attachments/assets/efbc69e7-4438-485e-9027-92ef07f66857" />

  Frontend ve API Entegrasyonu:
    Web tarafı, backend ile şu şekilde haberleşir.
    - const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

  Sonuç:
    Kısaca Backend'in Frontend ile entegrasyonu, API aracılığıyla bağlantıların kurulması, veritabanı entegrasyonu, login-register sistemi ve randevu alma sisteminin başarılı şekilde
    gerçekleşmesi sayesinde randevu ve rezervasyon sistemi projesinin kısmen tamamlandığını söylenebilir. Geri kalan zamanda arayüz güncellemeleri ve admin paneli oluşturularak birtakım eksiklikler düzeltilecektir.
  
    
   














    

    
      
    


