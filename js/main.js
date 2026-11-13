const events = [
 {id:"KF001",title:"Little Artist: Painting Day",category:"Kreativitas",date:"24 November 2026",time:"09.00–11.00 WIB",location:"Depok",price:75000,age:"4–9 tahun",spots:18,desc:"Eksplorasi warna dan imajinasi lewat aktivitas melukis yang menyenangkan.",image:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85"},
 {id:"KF002",title:"KiddyFun Mini Carnival",category:"Festival",date:"29 November 2026",time:"10.00–15.00 WIB",location:"Jakarta Selatan",price:120000,age:"3–12 tahun",spots:32,desc:"Sehari penuh permainan, pertunjukan, dan aktivitas seru bersama keluarga.",image:"https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=85"},
 {id:"KF003",title:"Junior Science Lab",category:"Edukasi",date:"6 Desember 2026",time:"10.00–12.00 WIB",location:"Tangerang",price:90000,age:"6–12 tahun",spots:14,desc:"Eksperimen sains sederhana yang aman, seru, dan bikin penasaran.",image:"https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=900&q=85"},
 {id:"KF004",title:"Little Chef Cooking Class",category:"Kreativitas",date:"13 Desember 2026",time:"09.30–12.00 WIB",location:"Depok",price:100000,age:"5–10 tahun",spots:12,desc:"Belajar menghias makanan dan mengenal bahan dapur dengan cara menyenangkan.",image:"https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85"},
 {id:"KF005",title:"Mini Nature Explorer",category:"Petualangan",date:"20 Desember 2026",time:"08.00–11.00 WIB",location:"Bogor",price:85000,age:"5–11 tahun",spots:20,desc:"Petualangan mengenal alam, mengamati tanaman, dan bermain di luar ruangan.",image:"https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=85"},
 {id:"KF006",title:"Christmas Kids Celebration",category:"Festival",date:"27 Desember 2026",time:"13.00–16.00 WIB",location:"Jakarta",price:110000,age:"3–10 tahun",spots:25,desc:"Perayaan akhir tahun dengan games, craft corner, dan sesi foto keluarga.",image:"https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=85"}
];

const seedFunnel = [1250, 820, 460, 320, 198];
const stageNames = ["Pengunjung website","Melihat detail event","Memulai pendaftaran","Pendaftaran berhasil","Hadir di event"];
const stageDescriptions = ["Pengguna yang membuka KiddyFun","Pengguna yang membuka salah satu detail event","Pengguna yang mulai mengisi formulir","Formulir berhasil dikirim","Peserta yang hadir (simulasi)"];
const $ = id => document.getElementById(id);
const money = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
let funnel = JSON.parse(localStorage.getItem("kiddyfunFunnel") || "null") || [...seedFunnel];
let registrations = JSON.parse(localStorage.getItem("kiddyfunRegistrations") || "[]");

function save(){localStorage.setItem("kiddyfunFunnel",JSON.stringify(funnel));localStorage.setItem("kiddyfunRegistrations",JSON.stringify(registrations));}
function renderEvents(){
 const query=$("searchInput").value.toLowerCase().trim(), category=$("categoryFilter").value;
 const filtered=events.filter(e=>(category==="all"||e.category===category)&&[e.title,e.location,e.category,e.desc].join(" ").toLowerCase().includes(query));
 $("eventGrid").innerHTML=filtered.map(e=>`<article class="event-card"><div class="event-image"><img src="${e.image}" alt="${e.title}" loading="lazy"><span class="event-category">${e.category}</span></div><div class="event-body"><div class="event-meta"><span>▦ ${e.date}</span><span>⌖ ${e.location}</span></div><h3>${e.title}</h3><p>${e.desc}</p><div class="event-bottom"><span class="event-price">${money(e.price)}<small>${e.age} · ${e.spots} slot demo</small></span><button class="primary-button" onclick="openRegistration('${e.id}')">Daftar ↗</button></div></div></article>`).join("");
 $("emptyMessage").classList.toggle("hidden",filtered.length>0);
}
function renderFunnel(){
 const max=funnel[0]||1;
 $("funnelList").innerHTML=funnel.map((n,i)=>{
  const width=Math.max(3,n/max*100),stepRate=i===0?100:(funnel[i-1]?n/funnel[i-1]*100:0),drop=i===0?0:100-stepRate;
  return `<div class="funnel-stage"><div class="stage-info"><strong>${i+1}. ${stageNames[i]}</strong><span>${n.toLocaleString("id-ID")} orang · ${stepRate.toFixed(1)}%</span></div><div class="funnel-track"><div class="funnel-fill" style="width:${width}%">${(n/max*100).toFixed(1)}%</div></div><div class="stage-sub">${stageDescriptions[i]}${i>0?` · Drop-off tahap ini: ${drop.toFixed(1)}%`:" · Baseline pengunjung"}</div></div>`;
 }).join("");
 $("overallYield").textContent=(funnel[4]/(funnel[0]||1)*100).toFixed(1)+"%";
}
function renderTickets(){
 $("ticketCount").textContent=registrations.length;
 $("ticketList").innerHTML=registrations.length?registrations.map(r=>`<article class="ticket-item"><strong>${escapeHtml(r.eventTitle)}</strong><p>Peserta: ${escapeHtml(r.childName)} (${escapeHtml(r.childAge)}) · ${escapeHtml(r.eventDate)}</p><span class="ticket-code">TIKET: ${r.code} · STATUS: TERDAFTAR</span></article>`).join(""):`<div class="empty-ticket">Belum ada tiket. Yuk, pilih event seru untuk si kecil!</div>`;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function openRegistration(id){
 const event=events.find(e=>e.id===id);if(!event)return;
 $("selectedEventId").value=id;$("modalEventName").textContent=`${event.title} · ${event.date} · ${money(event.price)}`;
 $("registrationModal").classList.remove("hidden");
 // Funnel step: detail event dibuka.
 funnel[1]++;save();renderFunnel();
}
function closeModals(){document.querySelectorAll(".modal-backdrop").forEach(m=>m.classList.add("hidden"));}
function toast(message){$("toast").textContent=message;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2800);}
$("registrationForm").addEventListener("submit",e=>{
 e.preventDefault();const id=$("selectedEventId").value,event=events.find(x=>x.id===id);
 if(!event)return;
 // Funnel step: mulai mengisi dan menyelesaikan pendaftaran.
 funnel[2]++;funnel[3]++;
 const code="KF"+Math.random().toString(36).slice(2,8).toUpperCase();
 registrations.unshift({code,eventId:id,eventTitle:event.title,eventDate:event.date,parentName:$("parentName").value,childName:$("childName").value,childAge:$("childAge").value,email:$("parentEmail").value,phone:$("parentPhone").value});
 save();renderFunnel();renderTickets();$("registrationForm").reset();closeModals();toast("Yeay! Pendaftaran berhasil. Tiketmu sudah tersimpan.");
});
$("ticketsButton").addEventListener("click",()=>{$("ticketsModal").classList.remove("hidden");renderTickets();});
$("loginButton").addEventListener("click",()=>{$("ticketsModal").classList.remove("hidden");renderTickets();});
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",closeModals));
document.querySelectorAll(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModals();}));
$("searchButton").addEventListener("click",renderEvents);
$("searchInput").addEventListener("input",renderEvents);
$("categoryFilter").addEventListener("change",renderEvents);
$("clearFilter").addEventListener("click",()=>{$("searchInput").value="";$("categoryFilter").value="all";renderEvents();});
$("resetDemo").addEventListener("click",()=>{if(confirm("Kembalikan funnel ke data dummy awal dan hapus tiket demo di browser ini?")){funnel=[...seedFunnel];registrations=[];save();renderFunnel();renderTickets();toast("Data demo berhasil direset.");}});
$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>$("mainNav").classList.remove("open")));

// Satu kunjungan per sesi browser dihitung sebagai pengunjung baru.
if(!sessionStorage.getItem("kiddyfunVisitCounted")){funnel[0]++;sessionStorage.setItem("kiddyfunVisitCounted","yes");save();}
renderEvents();renderFunnel();renderTickets();

// Tombol Logout
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        // Menghapus status login
        sessionStorage.removeItem("kiddyfunLoggedIn");

        // Kembali ke halaman login
        window.location.href = "login.html";

    });

}


// ===== KIDDYBOT CHAT FUNCTION =====

const kiddybotToggle = document.getElementById("kiddybot-toggle");
const kiddybotWindow = document.getElementById("kiddybot-window");
const kiddybotClose = document.getElementById("kiddybot-close");
const kiddybotForm = document.getElementById("kiddybot-form");
const kiddybotInput = document.getElementById("kiddybot-input");
const kiddybotMessages = document.getElementById("kiddybot-messages");
const kiddybotQuickArea = document.querySelector(".kiddybot-quick-area");
const kiddybotQuickQuestions = document.querySelector(".kiddybot-quick-questions");

// URL Production n8n
const KIDDYBOT_API = "http://localhost:5678/webhook/kiddybot-chat";

// Membuka chat
kiddybotToggle.addEventListener("click", () => {
    kiddybotWindow.classList.remove("kiddybot-hidden");
    kiddybotToggle.style.display = "none";
});

// Menutup chat
kiddybotClose.addEventListener("click", () => {
    kiddybotWindow.classList.add("kiddybot-hidden");
    kiddybotToggle.style.display = "block";
});

// Menampilkan atau menyembunyikan seluruh area pertanyaan cepat
function toggleQuickQuestions(show) {
    if (kiddybotQuickArea) {
        kiddybotQuickArea.style.display = show ? "block" : "none";
    }
}

// Menambahkan pesan ke chat
function addKiddybotMessage(message, sender) {
    const messageElement = document.createElement("div");

    messageElement.classList.add("kiddybot-message", sender);
    messageElement.textContent = message;

    kiddybotMessages.appendChild(messageElement);
    kiddybotMessages.scrollTop = kiddybotMessages.scrollHeight;

    return messageElement;
}

// Mengirim pertanyaan ke Hermes melalui n8n
async function sendKiddybotQuestion(question) {

    if (!question || kiddybotInput.disabled) return;

    // Sembunyikan pertanyaan cepat
    toggleQuickQuestions(false);

    // Tampilkan pesan pengguna
    addKiddybotMessage(question, "user");

    // Kosongkan dan nonaktifkan input
    kiddybotInput.value = "";
    kiddybotInput.disabled = true;

    const sendButton = kiddybotForm.querySelector("button");
    sendButton.disabled = true;

    // Tampilkan status berpikir
    const loadingMessage = addKiddybotMessage(
        "KiddyBot sedang berpikir... 🐻",
        "bot"
    );

    try {
        const response = await fetch(KIDDYBOT_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: question
            })
        });

        if (!response.ok) {
            throw new Error("Server memberikan respons " + response.status);
        }

        const data = await response.json();

        loadingMessage.textContent =
            data.reply || "Maaf, KiddyBot belum mendapatkan jawaban.";

    } catch (error) {
        console.error("KiddyBot Error:", error);

        loadingMessage.textContent =
            "Maaf, KiddyBot belum bisa terhubung. Coba lagi sebentar, ya!";

    } finally {

        // Aktifkan kembali input
        kiddybotInput.disabled = false;
        sendButton.disabled = false;

        // Tampilkan pertanyaan cepat di bawah percakapan
        toggleQuickQuestions(true);

        // Scroll ke pesan terakhir
        kiddybotMessages.scrollTop = kiddybotMessages.scrollHeight;

        kiddybotInput.focus();
    }
}

// Mengirim pertanyaan dari kolom chat
kiddybotForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const question = kiddybotInput.value.trim();

    sendKiddybotQuestion(question);
});

// Mengirim pertanyaan dari tombol pertanyaan cepat
kiddybotQuickQuestions.addEventListener("click", (event) => {

    const button = event.target.closest(".kiddybot-quick-btn");

    if (!button) return;
    if (kiddybotInput.disabled) return;

    const question = button.dataset.question;

    sendKiddybotQuestion(question);
});



