// ========== تهيئة الموقع وجميع البيانات ==========
document.addEventListener('DOMContentLoaded', function() {
    loadPrinciples();
    loadLeaders();
    loadStats();
    loadEvents();
    loadNews();
    setupMobileMenu();
    updateCopyrightYear();
    setupHeaderScroll();
});

// ========== 1. إدارة القائمة المنسدلة ==========
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            mainNav.classList.toggle('active');
        });
    }
}

function closeMenu() {
    const mainNav = document.getElementById('mainNav');
    if (mainNav) mainNav.classList.remove('active');
}

// ========== 2. نظام الإشعارات (Toast) ==========
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    if (type === 'success') toast.style.background = 'var(--green)';
    if (type === 'error') toast.style.background = 'var(--red)';
    if (type === 'info') toast.style.background = '#0284c7';
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========== 3. تحميل مبادئ الحزب ==========
function loadPrinciples() {
    const principles = [
        { icon: 'fa-scale-balanced', title: 'عدالة', desc: 'محاربة الفساد وتكريس المساواة وتوزيع عادل للثروات.' },
        { icon: 'fa-graduation-cap', title: 'تعليم', desc: 'الاستثمار في المدرسة العمومية وتكوين الشباب لمواكبة العصر.' },
        { icon: 'fa-hand-holding-heart', title: 'تضامن', desc: 'دعم الفئات الهشة ورفع الدعم عن الأغنياء وتوجيهه لمستحقيه.' },
        { icon: 'fa-globe', title: 'سيادة', desc: 'جزائر مستقلة القرار، دبلوماسية متوازنة تحمي مصالح الشعب.' }
    ];
    
    const container = document.getElementById('principlesCards');
    if (container) {
        container.innerHTML = principles.map(p => `
            <div class="card">
                <i class="fas ${p.icon}"></i>
                <h4>${p.title}</h4>
                <p>${p.desc}</p>
            </div>
        `).join('');
    }
}

// ========== 4. تحميل قيادات الحزب بالصور ==========
function loadLeaders() {
    const leaders = [
        { 
            image: 'https://ui-avatars.com/api/?name=لمين+عصماني&size=140&background=006633&color=fff',
            name: 'لمين عصماني', 
            title: 'الرئيس العام للحزب',
            desc: 'الأمين العام والمؤسس، خبرة 20 سنة في العمل السياسي'
        },
        { 
            image: 'https://ui-avatars.com/api/?name=فاطمة+الزهراء&size=140&background=D21034&color=fff',
            name: 'فاطمة الزهراء', 
            title: 'نائب الرئيس',
            desc: 'أستاذة جامعية، متخصصة في التنمية المحلية'
        },
        { 
            image: 'https://ui-avatars.com/api/?name=جمال+الدين&size=140&background=006633&color=fff',
            name: 'جمال الدين', 
            title: 'الناطق الرسمي',
            desc: 'إعلامي، عضو المجلس الوطني'
        }
    ];
    
    const container = document.getElementById('leadersGrid');
    if (container) {
        container.innerHTML = leaders.map(l => `
            <div class="leader-card">
                <div class="leader-img">
                    <img src="${l.image}" alt="${l.name}">
                </div>
                <h4>${l.name}</h4>
                <div class="leader-title">${l.title}</div>
                <p class="leader-desc">${l.desc}</p>
            </div>
        `).join('');
    }
}

// ========== 5. تحميل الإحصائيات ==========
function loadStats() {
    const stats = [
        { icon: 'fa-building', number: '48', label: 'مركز حزبي', desc: 'في 48 ولاية' },
        { icon: 'fa-users', number: '15.2k', label: 'منخرط', desc: 'عضو عامل' },
        { icon: 'fa-flag', number: '312', label: 'فرع بلدي', desc: 'مكتب محلي' },
        { icon: 'fa-hand-holding-heart', number: '74', label: 'برنامج اجتماعي', desc: 'مشروع قيد الإنجاز' }
    ];
    
    const container = document.getElementById('statsGrid');
    if (container) {
        container.innerHTML = stats.map(s => `
            <div class="stat-item" onclick="increaseStat(this)">
                <div class="stat-icon"><i class="fas ${s.icon}"></i></div>
                <div class="stat-number">${s.number}</div>
                <div class="stat-label">${s.label}</div>
                <p style="color: #64748b;">${s.desc}</p>
            </div>
        `).join('');
    }
}

// ========== 6. زيادة الإحصائيات (تفاعلي) ==========
function increaseStat(element) {
    let statNum = element.querySelector('.stat-number');
    let current = statNum.innerText;
    
    if (current.includes('k')) {
        let num = parseFloat(current) * 1000 + 100;
        statNum.innerText = (num / 1000).toFixed(1) + 'k';
    } else {
        let num = parseInt(current) + 1;
        statNum.innerText = num;
    }
    
    showToast('✅ تم تحديث الإحصائية', 'success');
}

// ========== 7. تحميل الفعاليات ==========
function loadEvents() {
    const events = [
        { day: '15', month: 'مارس', title: 'ملتقى وطني حول الإسكان', location: 'قسنطينة' },
        { day: '22', month: 'مارس', title: 'ندوة صحفية لرئيس الحزب', location: 'الجزائر العاصمة' },
        { day: '05', month: 'أفريل', title: 'انطلاق حملة "شباب يبني"', location: 'وهران' }
    ];
    
    const container = document.getElementById('eventsGrid');
    if (container) {
        container.innerHTML = events.map(e => `
            <div class="event-card">
                <div class="event-date">
                    <div class="day">${e.day}</div>
                    <div class="month">${e.month}</div>
                </div>
                <div class="event-info">
                    <h4>${e.title}</h4>
                    <p><i class="fas fa-map-marker-alt" style="color: var(--green);"></i> ${e.location}</p>
                </div>
            </div>
        `).join('');
    }
}

// ========== 8. تحميل الأخبار ==========
function loadNews() {
    const news = [
        { tag: 'بيان', title: 'الحزب يدعم مقترحات تعديل قانون البلدية', desc: 'صوت الشعب يقدم رؤيته لزيادة صلاحيات المنتخبين المحليين.' },
        { tag: 'ملتقى', title: 'الملتقى الوطني حول الإسكان: وعود وحلول', desc: 'خبراء وأكاديميون يناقشون أزمة السكن.' },
        { tag: 'شباب', title: 'إطلاق أكاديمية القيادة للتكوين السياسي', desc: 'تسجيل مفتوح للشباب بين 18 و35 سنة في 48 ولاية.' }
    ];
    
    const container = document.getElementById('newsGrid');
    if (container) {
        container.innerHTML = news.map(n => `
            <div class="news-item">
                <span style="background: var(--red); color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem;">${n.tag}</span>
                <h4 style="margin: 15px 0 10px; font-size: 1.3rem;">${n.title}</h4>
                <p style="color: #64748b; margin-bottom: 15px;">${n.desc}</p>
                <a href="#" onclick="showToast('جاري التحميل...', 'info')" style="color: var(--green); font-weight: 700; text-decoration: none;">
                    اقرأ المزيد <i class="fas fa-arrow-left"></i>
                </a>
            </div>
        `).join('');
    }
}

// ========== 9. نظام إرسال الرسائل ==========
function sendMessage() {
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const subject = document.getElementById('subjectInput').value;
    const message = document.getElementById('messageInput').value;
    
    if (!name || !email || !message) {
        showToast('❌ الرجاء ملء جميع الحقول', 'error');
        return;
    }
    
    if (!email.includes('@')) {
        showToast('❌ البريد الإلكتروني غير صحيح', 'error');
        return;
    }
    
    showToast(`✅ شكراً ${name}، تم إرسال رسالتك بنجاح!`, 'success');
    
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('messageInput').value = '';
}

// ========== 10. تحديث سنة الحقوق ==========
function updateCopyrightYear() {
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const year = new Date().getFullYear();
        copyright.innerHTML = `© ${year} حزب صوت الشعب. جميع الحقوق محفوظة.`;
    }
}

// ========== 11. التمرير السلس للروابط ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========== 12. إخفاء الهيدر عند التمرير للأسفل ==========
function setupHeaderScroll() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    });
}

// عند تحميل الموقع العام
function loadPrinciples() {
    const principles = JSON.parse(localStorage.getItem('party_principles')) || [
        // المبادئ الافتراضية
    ];
    // عرض المبادئ
}