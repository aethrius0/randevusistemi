Yukarıdan ağ_tabanlı_randevu_programı klasörüne tıklayarak güncel koda erişebilirsiniz.

# AutoWash - Randevu & Rezervasyon Sistemi

Bu proje, araç yıkama randevu sistemini hem web hem de mobil platformda yönetmek amacıyla geliştirilmiştir. Kullanıcılar kayıt olabilir, giriş yapabilir, hizmete ve fiyata bağlı uygun tarih/saat seçerek randevu oluşturabilir.

---

## 📋 Proje Tasarım Durumu

### Frontend

#### Login-Register Sistemi
HTML, CSS, JS ile kodlandı. Uygulamayı başlattığımızda ilk başta karşımıza bir login-register ekranı çıkıyor.

<img width="800" alt="Login Ekranı" src="https://github.com/user-attachments/assets/82fb11cc-58d4-42e5-a426-45a54708cbf6" />

Kayıt olmak istediğiniz takdirde "Kayıt ol" butonuna basarak ad, soyad, e-posta, telefon ve şifrenizi girerek güvenli bir şekilde kaydolabilirsiniz.

<img width="800" alt="Kayıt Ekranı" src="https://github.com/user-attachments/assets/096a332e-3d4f-46ab-9957-e8a00bd22a9c" />

Şifrenizi değiştirmek isterseniz "Şifremi Unuttum" butonuna tıklayarak güncel olarak şifrenizi değiştirebilirsiniz.

<img width="800"  alt="Şifremi Unuttum Ekranı" src="https://github.com/user-attachments/assets/ede96e1f-4607-4d6f-b6fb-210bc5f69ee0" />


#### Ana Sayfa Kısmı
Kayıt olup giriş yaptıktan sonra karşımıza kullancıyı doğal renklerle karşılayan bir arayüz çıkıyor. Bu arayüzde sağdaki mini haritadan istediğiniz oto yıkama bayisini seçerek randevu alabilir ya da aşağıdan oto yıkamacının kendi reklamının altındaki randevu al butonuna basarak kolay yoldan randevu alabilirsiniz. Ayrıca yukarıdaki "Randevularım" ve "Profil" sekmelerine tıklayarak geçiş yapabilirsiniz. Yukarıdaki "Çıkış Yap" butonuyla kısa yoldan çıkış yapabilirsiniz.

<img width="800" alt="Ana Sayfa" src="https://github.com/user-attachments/assets/e055ebb0-6344-4882-93a3-078eab01d416" />


#### Randevular Kısmı
Randevular sekmesine geldiğimizde karşımıza kullanıcı dostu bir randevu oluşturma kısmı geliyor. Randevu oluştururken önce arabanızı yıkatmak istediğiniz oto yıkamacı seçilir. Sonrasında açılan pop-up'ta ilk başta araç plakası girilir, devamında fiyata bağlı arabaya yapılacak hizmetin türü seçilir. Ardından tarih ve saat seçildikten sonra "Randevu Al" butonuna basılır ve randevu başarıyla oluşturulur. Ayrıca oluşturduğumuz randevunun sağında bulunan "Düzenle" ve "Sil" butonlarını kullanarak randevuyu düzenleyebilir veya silebiliriz.

<img width="800" alt="Randevu Sayfası" src="https://github.com/user-attachments/assets/7f4ef496-6ea9-4fd9-945e-cb127a5cf8a0" />


#### Profil Kısmı
Profil kısmına geldiğimizde önümüze basit bir ad-soyad, e-posta ve telefon numarası bilgilerinin görüleceği kısım karşımıza çıkıyor. Hemen altında bir "Çıkış Yap" butonuyla karşılaşıyoruz. Butona basarak çıkış yapabilirsiniz.

<img width="800" alt="Profil Sayfası" src="https://github.com/user-attachments/assets/d54444ec-3306-42cd-9f5a-15c56d3c9d15" />


#### Admin Paneli
Admin Paneline normal kullanıcıların girdiği login paneli haricinde "admin-login.html" isminde farklı bir panelden giriş yapıyoruz. 

<img width="800"  alt="Admin Giriş Ekranı" src="https://github.com/user-attachments/assets/e1dacdf7-eb90-48d7-9b6b-194f0f4612dc" />

Giriş yaptıktan sonra karşınıza sizin oto yıkamacınıza özel gelen randevular karşınıza çıkıyor. Bu randevuları onaylayabilir, reddedebilir veya beklemede tutabilirsiniz. Randevuların kime ait olduğu, hangi hizmet türünün istendiğine kadar her detay karşınıza çıkıyor. Sol navbarımızda da "Randevular", "Müşteriler" ve "Profil" sekmesi geliyor. Bu sekmelerden "Müşteriler"e tıkladığımızda randevusu olan müşterilerin bilgilerini görebilir, "Profil" kısmından da kendi oto yıkamacımızın bilgilerini görebiliriz. Sol aşağıdan "Çıkış Yap" butonuna basarak admin panelinden çıkış yapabiliriz.

<img width="800" alt="Admin Paneli Randevular" src="https://github.com/user-attachments/assets/6be4dd60-be6a-4cae-a831-90da449e3cb2" />


---

### Backend

#### Login-Register Sistemi
Kullanıcı giriş–kayıt işlemleri için ASP.NET Core Web API üzerinde çalışan bir Authentication Controller (AuthController) geliştirilmiştir.

```csharp
[HttpPost("register")]
public IActionResult Register([FromBody] User user)
```

```csharp
[HttpPost("login")]
public IActionResult Login([FromBody] LoginRequest request)
```

#### Veritabanı Sistemi

Uygulama MySQL veritabanı kullanmaktadır. Sistemde 3 ana tablo bulunmaktadır:

###  Users Tablosu
Kullanıcı bilgilerini saklar.

| Alan | Açıklama |
|------|----------|
| Id | Kullanıcı birincil anahtarı |
| Name | Ad Soyad |
| Email | Kullanıcı email adresi |
| Phone | Telefon numarası |
| PasswordHash | Parola |

###  Appointments Tablosu
Randevu kayıtlarını saklar.

| Alan | Açıklama |
|------|----------|
| Id | Randevu birincil anahtarı |
| CarPlate | Araç plakası |
| ServiceType | Hizmet türü |
| AppointmentTime | Randevu tarihi ve saati |
| CarWashName | Şube adı |
| Status | Durum (Beklemede, Onaylandı, Reddedildi) |
| Price | Hizmet fiyatı (₺) |
| UserId | İlişkili kullanıcı ID  |

###  Admins Tablosu
Oto yıkama yöneticilerini saklar.

| Alan | Açıklama |
|------|----------|
| Id | Admin birincil anahtarı |
| Name | Yönetici adı |
| Email | Email adresi |
| PasswordHash | Parola |
| BranchName | Yönettiği bayi adı |

---

#### API Sistemi
Kullanıcı kayıt ve giriş işlemleri REST API üzerinden gerçekleşir. Swagger UI ile bu endpointler kolayca test edilebilmektedir.


[HttpPost("register")]
public IActionResult Register([FromBody] User user)



[HttpPost("login")]
public IActionResult Login([FromBody] LoginRequest request)


#### Swagger UI Sistemi
Backend geliştirirken ve test ortamında kolaylık sağlaması için Swagger UI aktif edilmiştir.

**Özellikler:**
- Tüm endpointler listelenir
- Request–Response gövdesi canlı gösterilir
- API çağrıları direkt tarayıcıdan test edilir

<img width="800"  alt="Swagger UI" src="https://github.com/user-attachments/assets/c6c6a92e-0d60-4942-86ff-997c545db323" />


#### Frontend ve API Entegrasyonu
Web tarafı, backend ile şu şekilde haberleşir:

```javascript
const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
});
```

---

## 📌 Sonuç

Kısaca Backend'in Frontend ile entegrasyonu, API aracılığıyla bağlantıların kurulması, veritabanı entegrasyonu, login-register sistemi ve randevu alma sisteminin başarılı şekilde gerçekleşmesi sayesinde randevu ve rezervasyon sistemi projesinin tamamlandığı söylenmiştir. Arayüz tamamen güncellenip daha kullanıcı dostu yapılmış ayrıca admin paneli sayesinde gelen randevuları kontrol edebileceğimiz panel de oluşturulmuştur. Kodlara yukarıdan erişebilirsiniz.
