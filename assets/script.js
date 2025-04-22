// ข้อมูลวิชาต่างๆ
const courses = [
    { code: "GEN351", name: "Modern Management and Leadership" },
    { code: "CSS336", name: "Software Engineering II" },
    { code: "NST311", name: "Computer Science for Contemporary Science" },
    { code: "CSS391", name: "Seminar in Applied Computer Science" },
    { code: "CSS382", name: "Accounting and Finance" },
    { code: "CSS423", name: "Cybersecurity" },
    { code: "CSS467", name: "Cybersecurity", isCyber: true }
];

const hiddenCourse = {
    code: "CSS467", 
    name: "Cybersecurity",
    secret: true
};

// สร้างรายการวิชา
function renderCourses() {
    const courseList = document.querySelector('.course-list');
    
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.isCyber ? 'cyber-card' : ''}`;
        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
        `;
        card.addEventListener('click', () => redirectToCourse(course.code.toLowerCase()));
        courseList.appendChild(card);
    });
}

// ตรวจสอบ Flag
function checkFlagAccess() {
    if(window.location.pathname.includes('/secret/flag.html')) {
        const visitedHiddenCourse = localStorage.getItem('visitedHiddenCourse');
        const visitedFakeCyber = localStorage.getItem('visitedFakeCyber');
        
        if(visitedHiddenCourse === 'true') {
            showFlag();
        } else {
            document.body.innerHTML = `
                <div class="flag-container">
                    <h2>Access Denied</h2>
                    <p>You need to find the hidden course first!</p>
                    <p class="hint">Hint: Check the console log on main page</p>
                </div>
            `;
            console.log("Hint: Try Ctrl+Click on the page title");
        }
    }
}

// แสดง Flag
function showFlag() {
    const flag = "YearlyLeak_JS_Challenge_2024";
    const md5Flag = md5(hash);
    document.body.innerHTML = `
        <div class="flag-container">
            <h2>Congratulations!</h2>
            <p>You found the real flag:</p>
            <div class="flag">KMUTTCTF{${md5Flag}}</div>
            <p class="hint">Flag: ${flag}</p>
        </div>
    `;
}

// MD5 Function (แบบง่าย)
function md5(input) {
    // ใช้ crypto-js ในความเป็นจริง
    return "cG9yY3RmMjAyNWxvdmV3ZWFscw=="; //  base64
}

// ตั้งค่าก Event Listener พิเศษ
function setupSpecialEvents() {
    // Ctrl+Click ที่หัวข้อเพื่อแสดงวิชาที่ซ่อนอยู่
    document.getElementById('page-title').addEventListener('click', (e) => {
        if(e.ctrlKey) {
            console.log("Hidden Course:", hiddenCourse);
            alert(`Found hidden course: ${hiddenCourse.code} - ${hiddenCourse.name}`);
            localStorage.setItem('visitedHiddenCourse', 'true');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    setupSpecialEvents();
    checkFlagAccess();
    
    // คำใบ้ใน console
    console.log("Looking for the flag? You'll need to:");
    console.log("1. Find the hidden course");
    console.log("2. Visit the fake cyber course");
    console.log("3. Then check the /secret/ directory");
});