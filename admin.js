// ========== نظام لوحة التحكم المتكامل مع صلاحيات وتعليقات وتقارير ==========

// التحقق من الجلسة
if (localStorage.getItem('admin_logged_in') !== 'true') {
    window.location.href = 'login.html';
}

// ========== قاعدة البيانات المتقدمة ==========
let database = {
    // المحتوى الأساسي
    principles: JSON.parse(localStorage.getItem('db_principles')) || [
        { id: 1, icon: 'fa-scale-balanced', title: 'عدالة', description: 'محاربة الفساد وتكريس المساواة', date: '2026-02-12', author: 'المدير العام', views: 145 },
        { id: 2, icon: 'fa-graduation-cap', title: 'تعليم', description: 'الاستثمار في المدرسة العمومية', date: '2026-02-12', author: 'المدير العام', views: 132 },
        { id: 3, icon: 'fa-hand-holding-heart', title: 'تضامن', description: 'دعم الفئات الهشة', date: '2026-02-12', author: 'المدير العام', views: 98 },
        { id: 4, icon: 'fa-globe', title: 'سيادة', description: 'جزائر مستقلة القرار', date: '2026-02-12', author: 'المدير العام', views: 156 }
    ],
    
    leaders: JSON.parse(localStorage.getItem('db_leaders')) || [
        { id: 1, name: 'لمين عصماني', title: 'الرئيس العام للحزب', image: '', description: 'الأمين العام والمؤسس', date: '2026-02-12' },
        { id: 2, name: 'فاطمة الزهراء', title: 'نائب الرئيس', image: '', description: 'أستاذة جامعية', date: '2026-02-12' },
        { id: 3, name: 'جمال الدين', title: 'الناطق الرسمي', image: '', description: 'إعلامي', date: '2026-02-12' }
    ],
    
    stats: JSON.parse(localStorage.getItem('db_stats')) || [
        { id: 1, icon: 'fa-building', label: 'مركز حزبي', value: '48', description: 'في 48 ولاية' },
        { id: 2, icon: 'fa-users', label: 'منخرط', value: '15.2k', description: 'عضو عامل' },
        { id: 3, icon: 'fa-flag', label: 'فرع بلدي', value: '312', description: 'مكتب محلي' },
        { id: 4, icon: 'fa-hand-holding-heart', label: 'برنامج اجتماعي', value: '74', description: 'مشروع قيد الإنجاز' }
    ],
    
    events: JSON.parse(localStorage.getItem('db_events')) || [
        { id: 1, day: '15', month: 'مارس', title: 'ملتقى وطني حول الإسكان', location: 'قسنطينة', attendees: 45 },
        { id: 2, day: '22', month: 'مارس', title: 'ندوة صحفية لرئيس الحزب', location: 'الجزائر', attendees: 78 },
        { id: 3, day: '05', month: 'أفريل', title: 'حملة شباب يبني', location: 'وهران', attendees: 120 }
    ],
    
    news: JSON.parse(localStorage.getItem('db_news')) || [
        { id: 1, tag: 'بيان', title: 'الحزب يدعم مقترحات تعديل قانون البلدية', description: 'صوت الشعب يقدم رؤيته لزيادة صلاحيات المنتخبين المحليين.', date: '2026-02-12', views: 234 },
        { id: 2, tag: 'ملتقى', title: 'الملتقى الوطني حول الإسكان: وعود وحلول', description: 'خبراء وأكاديميون يناقشون أزمة السكن.', date: '2026-02-11', views: 187 },
        { id: 3, tag: 'شباب', title: 'إطلاق أكاديمية القيادة للتكوين السياسي', description: 'تسجيل مفتوح للشباب بين 18 و35 سنة.', date: '2026-02-10', views: 312 }
    ],
    
    messages: JSON.parse(localStorage.getItem('db_messages')) || [
        { id: 1, name: 'أحمد علي', email: 'ahmed@email.com', subject: 'طلب انضمام', message: 'أريد الانضمام إلى الحزب', date: '2026-02-12', status: 'جديد' },
        { id: 2, name: 'فاطمة بن سعيد', email: 'fatima@email.com', subject: 'استفسار', message: 'كيف يمكنني التطوع؟', date: '2026-02-11', status: 'مقروء' },
        { id: 3, name: 'يوسف محمود', email: 'youssef@email.com', subject: 'اقتراح', message: 'اقتراح برنامج شبابي', date: '2026-02-10', status: 'تم الرد' }
    ],
    
    // ========== قسم جديد: التعليقات ==========
    comments: JSON.parse(localStorage.getItem('db_comments')) || [
        { id: 1, newsId: 1, name: 'كريمة', comment: 'عمل رائع، وفقكم الله', date: '2026-02-12', status: 'منشور' },
        { id: 2, newsId: 1, name: 'عبد الرحمان', comment: 'متى موعد الندوة؟', date: '2026-02-11', status: 'منتظر' },
        { id: 3, newsId: 2, name: 'سامية', comment: 'هل هناك تسجيل؟', date: '2026-02-10', status: 'منشور' }
    ],
    
    // ========== قسم جديد: المستخدمون ==========
    users: JSON.parse(localStorage.getItem('db_users')) || [
        { id: 1, name: 'المدير العام', email: 'admin@chaab.dz', role: 'admin', permissions: 'كل الصلاحيات', lastLogin: '2026-02-12' },
        { id: 2, name: 'أحمد منصور', email: 'ahmed@chaab.dz', role: 'editor', permissions: 'نشر وتحرير', lastLogin: '2026-02-11' },
        { id: 3, name: 'سارة بن علي', email: 'sara@chaab.dz', role: 'author', permissions: 'كتابة فقط', lastLogin: '2026-02-10' }
    ],
    
    settings: {
        siteTitle: 'حزب صوت الشعب',
        siteDescription: 'الكرامة، العدالة الاجتماعية، السيادة الوطنية',
        contactEmail: 'contact@chaab.dz',
        contactPhone: '021 00 11 22',
        address: '15 شارع ديدوش مراد، الجزائر',
        postsPerPage: 10,
        commentsApproval: true,
        siteUrl: 'https://njoomedu.github.io/People-Voice/'
    }
};

// ========== حفظ البيانات في LocalStorage ==========
function saveToStorage() {
    localStorage.setItem('db_principles', JSON.stringify(database.principles));
    localStorage.setItem('db_leaders', JSON.stringify(database.leaders));
    localStorage.setItem('db_stats', JSON.stringify(database.stats));
    localStorage.setItem('db_events', JSON.stringify(database.events));
    localStorage.setItem('db_news', JSON.stringify(database.news));
    localStorage.setItem('db_messages', JSON.stringify(database.messages));
    localStorage.setItem('db_comments', JSON.stringify(database.comments));
    localStorage.setItem('db_users', JSON.stringify(database.users));
}

// ========== نظام الصلاحيات ==========
const permissions = {
    admin: {
        canEdit: true, canDelete: true, canAdd: true, canManageUsers: true, canChangeSettings: true, canApproveComments: true
    },
    editor: {
        canEdit: true, canDelete: true, canAdd: true, canManageUsers: false, canChangeSettings: false, canApproveComments: true
    },
    author: {
        canEdit: false, canDelete: false, canAdd: true, canManageUsers: false, canChangeSettings: false, canApproveComments: false
    }
};

// معرفة صلاحيات المستخدم الحالي
const currentUserRole = localStorage.getItem('admin_role') || 'admin';
const userPermissions = permissions[currentUserRole];

// ========== تحميل المحتوى حسب القسم ==========
function loadSection(section) {
    // تحديث التبويب النشط
    document.querySelectorAll('.admin-nav li').forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('onclick') && li.getAttribute('onclick').includes(section)) {
            li.classList.add('active');
        }
    });
    
    // تغيير عنوان الصفحة
    const titles = {
        dashboard: 'الرئيسية',
        principles: 'إدارة المبادئ',
        leaders: 'إدارة القيادات',
        stats: 'إدارة الإحصائيات',
        events: 'إدارة الفعاليات',
        news: 'إدارة الأخبار',
        messages: 'الرسائل الواردة',
        comments: 'إدارة التعليقات',
        reports: 'التقارير والإحصائيات',
        users: 'إدارة المستخدمين',
        settings: 'إعدادات الموقع'
    };
    document.getElementById('pageTitle').textContent = titles[section];
    
    const contentDiv = document.getElementById('adminContent');
    
    switch(section) {
        case 'dashboard': contentDiv.innerHTML = getDashboardHTML(); break;
        case 'principles': contentDiv.innerHTML = getPrinciplesHTML(); break;
        case 'leaders': contentDiv.innerHTML = getLeadersHTML(); break;
        case 'stats': contentDiv.innerHTML = getStatsHTML(); break;
        case 'events': contentDiv.innerHTML = getEventsHTML(); break;
        case 'news': contentDiv.innerHTML = getNewsHTML(); break;
        case 'messages': contentDiv.innerHTML = getMessagesHTML(); break;
        case 'comments': contentDiv.innerHTML = getCommentsHTML(); break;
        case 'reports': contentDiv.innerHTML = getReportsHTML(); break;
        case 'users': contentDiv.innerHTML = getUsersHTML(); break;
        case 'settings': contentDiv.innerHTML = getSettingsHTML(); break;
    }
    
    // تهيئة محرر النصوص في أقسام معينة
    if (section === 'news' || section === 'principles') {
        setTimeout(initEditor, 500);
    }
}

// ========== الصفحة الرئيسية المتطورة ==========
function getDashboardHTML() {
    const today = new Date().toLocaleDateString('ar-DZ');
    const newMessages = database.messages.filter(m => m.status === 'جديد').length;
    const pendingComments = database.comments.filter(c => c.status === 'منتظر').length;
    const totalViews = database.news.reduce((sum, n) => sum + (n.views || 0), 0);
    
    return `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 25px; margin-bottom: 30px;">
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-newspaper"></i></div>
                <div class="stat-info">
                    <h3>المقالات</h3>
                    <div class="number">${database.news.length}</div>
                    <small>${totalViews} مشاهدة</small>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-comments"></i></div>
                <div class="stat-info">
                    <h3>التعليقات</h3>
                    <div class="number">${database.comments.length}</div>
                    <small>${pendingComments} بانتظار المراجعة</small>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-envelope"></i></div>
                <div class="stat-info">
                    <h3>الرسائل</h3>
                    <div class="number">${database.messages.length}</div>
                    <small>${newMessages} رسائل جديدة</small>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-calendar"></i></div>
                <div class="stat-info">
                    <h3>الفعاليات</h3>
                    <div class="number">${database.events.length}</div>
                    <small>${database.events.reduce((sum, e) => sum + (e.attendees || 0), 0)} مشارك</small>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 25px;">
            <div class="data-table">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3>📰 آخر الأخبار</h3>
                    <a href="#" onclick="loadSection('news')" style="color: var(--green);">عرض الكل</a>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>العنوان</th>
                            <th>التاريخ</th>
                            <th>المشاهدات</th>
                            <th>الحالة</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${database.news.slice(0, 5).map(n => `
                            <tr>
                                <td>${n.title}</td>
                                <td>${n.date}</td>
                                <td>${n.views || 0}</td>
                                <td><span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 20px;">منشور</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="data-table">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3>💬 أحدث التعليقات</h3>
                    <a href="#" onclick="loadSection('comments')" style="color: var(--green);">إدارة</a>
                </div>
                ${database.comments.slice(0, 5).map(c => {
                    const newsTitle = database.news.find(n => n.id === c.newsId)?.title || 'خبر';
                    return `
                        <div style="padding: 15px; border-bottom: 1px solid #e2e8f0;">
                            <div style="display: flex; justify-content: space-between;">
                                <strong>${c.name}</strong>
                                <span style="color: #64748b; font-size: 12px;">${c.date}</span>
                            </div>
                            <p style="margin: 8px 0; color: #1e293b;">${c.comment}</p>
                            <small style="color: #64748b;">على: ${newsTitle}</small>
                            <span style="display: inline-block; margin-right: 10px; padding: 2px 8px; background: ${c.status === 'منشور' ? '#10b981' : '#f59e0b'}; color: white; border-radius: 20px; font-size: 11px;">${c.status}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// ========== إدارة التعليقات ==========
function getCommentsHTML() {
    return `
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <h2>إدارة التعليقات</h2>
            <div>
                <span style="background: #f59e0b; color: white; padding: 8px 16px; border-radius: 30px;">
                    ${database.comments.filter(c => c.status === 'منتظر').length} بانتظار المراجعة
                </span>
            </div>
        </div>
        
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>الكاتب</th>
                        <th>التعليق</th>
                        <th>الخبر</th>
                        <th>التاريخ</th>
                        <th>الحالة</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${database.comments.map(c => {
                        const newsTitle = database.news.find(n => n.id === c.newsId)?.title || 'غير معروف';
                        return `
                            <tr>
                                <td>${c.id}</td>
                                <td><strong>${c.name}</strong></td>
                                <td>${c.comment}</td>
                                <td>${newsTitle}</td>
                                <td>${c.date}</td>
                                <td>
                                    <span style="background: ${c.status === 'منشور' ? '#10b981' : c.status === 'منتظر' ? '#f59e0b' : '#94a3b8'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px;">
                                        ${c.status}
                                    </span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        ${c.status === 'منتظر' ? `
                                            <button class="edit-btn" onclick="approveComment(${c.id})">
                                                <i class="fas fa-check"></i>
                                            </button>
                                        ` : ''}
                                        <button class="delete-btn" onclick="deleteComment(${c.id})">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// ========== التقارير والإحصائيات ==========
function getReportsHTML() {
    // إحصائيات متقدمة
    const totalViews = database.news.reduce((sum, n) => sum + (n.views || 0), 0);
    const avgViews = Math.round(totalViews / database.news.length) || 0;
    const mostViewed = [...database.news].sort((a, b) => (b.views || 0) - (a.views || 0))[0];
    const totalMessages = database.messages.length;
    const totalEvents = database.events.length;
    const totalAttendees = database.events.reduce((sum, e) => sum + (e.attendees || 0), 0);
    
    return `
        <h2 style="margin-bottom: 20px;">📊 التقارير والإحصائيات</h2>
        
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
            <div style="background: linear-gradient(145deg, #006633, #004d26); color: white; padding: 25px; border-radius: 20px;">
                <i class="fas fa-eye" style="font-size: 2rem; margin-bottom: 15px;"></i>
                <h3 style="font-size: 2rem;">${totalViews}</h3>
                <p>إجمالي المشاهدات</p>
                <small style="opacity: 0.8;">معدل: ${avgViews} لكل خبر</small>
            </div>
            
            <div style="background: linear-gradient(145deg, #D21034, #a50d29); color: white; padding: 25px; border-radius: 20px;">
                <i class="fas fa-newspaper" style="font-size: 2rem; margin-bottom: 15px;"></i>
                <h3 style="font-size: 2rem;">${database.news.length}</h3>
                <p>إجمالي الأخبار</p>
                <small style="opacity: 0.8;">آخر خبر: ${database.news[0]?.date || '-'}</small>
            </div>
            
            <div style="background: linear-gradient(145deg, #f59e0b, #d97706); color: white; padding: 25px; border-radius: 20px;">
                <i class="fas fa-comments" style="font-size: 2rem; margin-bottom: 15px;"></i>
                <h3 style="font-size: 2rem;">${database.comments.length}</h3>
                <p>إجمالي التعليقات</p>
                <small style="opacity: 0.8;">${database.comments.filter(c => c.status === 'منتظر').length} بانتظار المراجعة</small>
            </div>
            
            <div style="background: linear-gradient(145deg, #3b82f6, #2563eb); color: white; padding: 25px; border-radius: 20px;">
                <i class="fas fa-calendar" style="font-size: 2rem; margin-bottom: 15px;"></i>
                <h3 style="font-size: 2rem;">${totalAttendees}</h3>
                <p>مشاركون في الفعاليات</p>
                <small style="opacity: 0.8;">${totalEvents} فعالية</small>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
            <div class="data-table">
                <h3 style="margin-bottom: 20px;">⭐ الأكثر قراءة</h3>
                ${mostViewed ? `
                    <div style="background: #f1f5f9; padding: 20px; border-radius: 16px;">
                        <h4 style="color: var(--green); margin-bottom: 10px;">${mostViewed.title}</h4>
                        <p style="color: #64748b; margin-bottom: 15px;">${mostViewed.description}</p>
                        <div style="display: flex; gap: 15px;">
                            <span><i class="fas fa-eye" style="color: var(--green);"></i> ${mostViewed.views} مشاهدة</span>
                            <span><i class="fas fa-calendar" style="color: var(--green);"></i> ${mostViewed.date}</span>
                        </div>
                    </div>
                ` : 'لا توجد بيانات'}
            </div>
            
            <div class="data-table">
                <h3 style="margin-bottom: 20px;">📧 آخر الرسائل</h3>
                ${database.messages.slice(0, 5).map(m => `
                    <div style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
                        <div style="display: flex; justify-content: space-between;">
                            <strong>${m.name}</strong>
                            <span style="color: #64748b;">${m.date}</span>
                        </div>
                        <p style="color: #1e293b; margin-top: 5px;">${m.subject}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ========== إدارة المستخدمين ==========
function getUsersHTML() {
    return `
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <h2>إدارة المستخدمين</h2>
            ${userPermissions.canManageUsers ? `
                <button class="btn btn-primary" onclick="showAddUserForm()">
                    <i class="fas fa-user-plus"></i> إضافة مستخدم
                </button>
            ` : ''}
        </div>
        
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>المستخدم</th>
                        <th>البريد</th>
                        <th>الصلاحية</th>
                        <th>آخر دخول</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${database.users.map(u => `
                        <tr>
                            <td>${u.id}</td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <img src="https://ui-avatars.com/api/?name=${u.name}&size=40&background=006633&color=fff" style="width: 40px; height: 40px; border-radius: 50%;">
                                    <strong>${u.name}</strong>
                                </div>
                            </td>
                            <td>${u.email}</td>
                            <td>
                                <span style="background: ${u.role === 'admin' ? '#D21034' : u.role === 'editor' ? '#f59e0b' : '#3b82f6'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px;">
                                    ${u.role === 'admin' ? 'مدير' : u.role === 'editor' ? 'محرر' : 'كاتب'}
                                </span>
                            </td>
                            <td>${u.lastLogin}</td>
                            <td>
                                <div class="action-buttons">
                                    ${userPermissions.canManageUsers && u.role !== 'admin' ? `
                                        <button class="delete-btn" onclick="deleteUser(${u.id})">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    ` : ''}
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// ========== دوال التعليقات ==========
function approveComment(id) {
    const comment = database.comments.find(c => c.id === id);
    if (comment) {
        comment.status = 'منشور';
        saveToStorage();
        loadSection('comments');
        showNotification('✅ تم نشر التعليق', 'success');
    }
}

function deleteComment(id) {
    if (confirm('هل أنت متأكد من حذف هذا التعليق؟')) {
        database.comments = database.comments.filter(c => c.id !== id);
        saveToStorage();
        loadSection('comments');
        showNotification('🗑️ تم حذف التعليق', 'success');
    }
}

// ========== دوال المستخدمين ==========
function showAddUserForm() {
    if (!userPermissions.canManageUsers) {
        showNotification('❌ لا تملك صلاحية إضافة مستخدمين', 'error');
        return;
    }
    
    const form = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 9999;">
            <div style="background: white; padding: 30px; border-radius: 20px; width: 500px; max-width: 90%;">
                <h3 style="margin-bottom: 20px;">إضافة مستخدم جديد</h3>
                
                <div class="form-group">
                    <label>الاسم الكامل</label>
                    <input type="text" id="userName" placeholder="مثال: أحمد منصور">
                </div>
                
                <div class="form-group">
                    <label>البريد الإلكتروني</label>
                    <input type="email" id="userEmail" placeholder="ahmed@chaab.dz">
                </div>
                
                <div class="form-group">
                    <label>كلمة المرور</label>
                    <input type="password" id="userPassword" placeholder="••••••••">
                </div>
                
                <div class="form-group">
                    <label>الصلاحية</label>
                    <select id="userRole">
                        <option value="editor">محرر (نشر وتحرير)</option>
                        <option value="author">كاتب (كتابة فقط)</option>
                    </select>
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                    <button class="btn btn-primary" onclick="addUser()">
                        <i class="fas fa-save"></i> حفظ
                    </button>
                    <button class="btn" style="background: #e2e8f0;" onclick="closeModal(this)">
                        <i class="fas fa-times"></i> إلغاء
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', form);
}

function addUser() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const role = document.getElementById('userRole').value;
    
    if (!name || !email || !password) {
        showNotification('❌ الرجاء ملء جميع الحقول', 'error');
        return;
    }
    
    const newId = database.users.length + 1;
    database.users.push({
        id: newId,
        name: name,
        email: email,
        role: role,
        permissions: role === 'editor' ? 'نشر وتحرير' : 'كتابة فقط',
        lastLogin: '-',
        password: btoa(password) // تشفير بسيط
    });
    
    saveToStorage();
    closeAllModals();
    loadSection('users');
    showNotification('✅ تم إضافة المستخدم بنجاح', 'success');
}

function deleteUser(id) {
    if (!userPermissions.canManageUsers) {
        showNotification('❌ لا تملك صلاحية حذف مستخدمين', 'error');
        return;
    }
    
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
        database.users = database.users.filter(u => u.id !== id);
        saveToStorage();
        loadSection('users');
        showNotification('🗑️ تم حذف المستخدم', 'success');
    }
}

// ========== إضافة سريعة ==========
function quickAdd() {
    const menu = `
        <div style="position: fixed; top: 80px; left: 20px; background: white; padding: 20px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); width: 250px; z-index: 9999;">
            <h4 style="margin-bottom: 15px;">إضافة سريعة</h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button class="admin-btn" onclick="loadSection('news'); showAddNewsForm(); closeModal(this)">
                    <i class="fas fa-newspaper"></i> خبر جديد
                </button>
                <button class="admin-btn" onclick="loadSection('events'); showAddEventForm(); closeModal(this)">
                    <i class="fas fa-calendar"></i> فعالية جديدة
                </button>
                <button class="admin-btn" onclick="loadSection('principles'); showAddPrincipleForm(); closeModal(this)">
                    <i class="fas fa-scale-balanced"></i> مبدأ جديد
                </button>
                <button class="admin-btn" onclick="loadSection('leaders'); showAddLeaderForm(); closeModal(this)">
                    <i class="fas fa-user-tie"></i> قيادي جديد
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menu);
}

// ========== محرر النصوص المتطور ==========
let editorInstance;
function initEditor() {
    if (document.querySelector('#newsContent') && !editorInstance) {
        ClassicEditor
            .create(document.querySelector('#newsContent'), {
                language: 'ar',
                toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', '|', 'undo', 'redo'],
                placeholder: 'اكتب محتوى الخبر هنا...'
            })
            .then(editor => {
                editorInstance = editor;
            })
            .catch(error => {
                console.error(error);
            });
    }
}

// ========== نظام الإشعارات ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#D21034' : '#3b82f6'};
        color: white;
        padding: 16px 32px;
        border-radius: 50px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ========== إضافة تأثيرات حركية ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            top: -100px;
            opacity: 0;
        }
        to {
            top: 20px;
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ========== البحث العام ==========
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                // تنفيذ البحث في المحتوى
                console.log('بحث عن:', query);
                // يمكن إضافة نتائج البحث في واجهة منبثقة
            }
        });
    }
    
    // تحميل الصفحة الرئيسية
    loadSection('dashboard');
    
    // حفظ البيانات عند الإغلاق
    window.addEventListener('beforeunload', function() {
        saveToStorage();
    });
});

// ========== تسجيل الخروج ==========
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('admin_logged_in');
        localStorage.removeItem('admin_email');
        localStorage.removeItem('admin_name');
        window.location.href = 'login.html';
    }
}

// ========== حفظ البيانات دورياً ==========
setInterval(saveToStorage, 30000); // كل 30 ثانية

// ========== باقي دوال الإضافة والتعديل والحذف من الملف السابق ==========
// (نفس دوال showAddPrincipleForm, addPrinciple, deletePrinciple, إلخ...)

// عند حفظ التعديلات في لوحة التحكم
function savePrinciples(principles) {
    localStorage.setItem('party_principles', JSON.stringify(principles));
}