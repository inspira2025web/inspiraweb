// =================================================================
// ==                 CONFIGURATION VARIABLES                     ==
// =================================================================

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr2cosjPXiSQH7aaedzthLv2E7kq0vclk",
  authDomain: "inspira-2.firebaseapp.com",
  projectId: "inspira-2",
  storageBucket: "inspira-2.firebasestorage.app",
  messagingSenderId: "470330649926",
  appId: "1:470330649926:web:703d628db10a3234e4c947"
};

// Google Apps Script Web App URL
const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzCd_8bJ8s2uDxXRDTKrs5LuYDSKcRta_rzBNVSOPwC9Jd6EnBmTz_7jmIyMXx_4oPv5w/exec';

// =================================================================
// ==                   FIREBASE INITIALIZATION                   ==
// =================================================================

// නිවැරදි Firebase ආරම්භක කේතය.
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// =================================================================
// ==                    DOM ELEMENT SELECTORS                    ==
// =================================================================

// URL පරීක්ෂා කර අදාළ පිටුවට අදාළ selectors පමණක් ලබා ගැනීම
const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
const isTicketPage = window.location.pathname.endsWith('ticket.html');

let signinForm, signupForm, signinError, signupError, loadingMessage, forgotPasswordLink, signoutBtn;
let userDisplayName, ticketName, ticketReg, ticketIdElement, downloadBtn;

if (isIndexPage) {
    signinForm = document.getElementById('signin-form');
    signupForm = document.getElementById('signup-form');
    signinError = document.getElementById('signin-error');
    signupError = document.getElementById('signup-error');
    loadingMessage = document.getElementById('loading-message');
    forgotPasswordLink = document.getElementById('forgot-password');
    
    // Tab functionality
    const signinTab = document.getElementById('signin-tab');
    const signupTab = document.getElementById('signup-tab');
    signinTab.addEventListener('click', () => {
        signinForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        signinTab.classList.add('tab-active');
        signupTab.classList.remove('tab-active');
    });
    signupTab.addEventListener('click', () => {
        signinForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        signinTab.classList.remove('tab-active');
        signupTab.classList.add('tab-active');
    });
}

if (isTicketPage) {
    signoutBtn = document.getElementById('signout-btn');
    userDisplayName = document.getElementById('user-display-name');
    ticketName = document.getElementById('ticket-name');
    ticketReg = document.getElementById('ticket-reg');
    ticketIdElement = document.getElementById('ticket-id');
    downloadBtn = document.getElementById('download-btn');
}

// =================================================================
// ==                   AUTHENTICATION LOGIC                      ==
// =================================================================

// පරිශීලකයා ලොග් වී ඇත්දැයි පරීක්ෂා කිරීම
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        if (isIndexPage) {
            window.location.href = 'ticket.html'; // ලොග් වෙලා නම් ticket පිටුවට යැවීම
        }
        if (isTicketPage) {
            populateTicketData(user.uid); // ටිකට් එකට දත්ත පිරවීම
        }
    } else {
        // User is signed out
        if (isTicketPage) {
            window.location.href = 'index.html'; // ලොග් වෙලා නැත්නම් index පිටුවට යැවීම
        }
    }
});


// --- Sign Up Functionality (index.html) ---
if (isIndexPage && signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const regNumber = document.getElementById('signup-reg-number').value.trim();
        const fullName = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();

        signupError.classList.add('hidden');
        loadingMessage.classList.remove('hidden');

        try {
            // Step 1: Google Sheet එකේ reg number එක තියෙනවද බලනවා
            const validationUrl = `${appsScriptUrl}?regNumber=${encodeURIComponent(regNumber)}`;
            const response = await fetch(validationUrl);
            const data = await response.json();

            if (data.status !== 'found') {
                throw new Error('This registration number is not valid or not found.');
            }
            
            // Step 2: Firebase වල userව create කරනවා
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Step 3: Firestore එකේ user data save කරනවා
            await db.collection('users').doc(user.uid).set({
                fullName: fullName,
                regNumber: regNumber,
                email: email
            });

            // Step 4: ටිකට් එක generate කරලා email කරනවා (Apps Script doPost එක call කරනවා)
            await generateAndSendTicket(regNumber, fullName, email);

            // සාර්ථකව ලියාපදිංචි වූ පසු ticket.html වෙත යොමු කිරීම
             window.location.href = 'ticket.html';

        } catch (error) {
            console.error("Sign up error:", error);
            signupError.textContent = error.message;
            signupError.classList.remove('hidden');
        } finally {
            loadingMessage.classList.add('hidden');
        }
    });
}

// --- Sign In Functionality (index.html) ---
if (isIndexPage && signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        signinError.classList.add('hidden');
        loadingMessage.classList.remove('hidden');

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Redirect will be handled by onAuthStateChanged
            })
            .catch(error => {
                signinError.textContent = error.message;
                signinError.classList.remove('hidden');
            })
            .finally(() => {
                loadingMessage.classList.add('hidden');
            });
    });
}

// --- Sign Out Functionality (ticket.html) ---
if (isTicketPage && signoutBtn) {
    signoutBtn.addEventListener('click', () => {
        auth.signOut();
    });
}

// --- Forgot Password Functionality (index.html) ---
if(isIndexPage && forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', () => {
        const email = document.getElementById('signin-email').value;
        if (!email) {
            alert('Please enter your email address in the sign-in form first.');
            return;
        }
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('Password reset email sent! Check your inbox.');
            })
            .catch(error => {
                alert('Error sending password reset email: ' + error.message);
            });
    });
}


// =================================================================
// ==                     TICKET PAGE LOGIC                       ==
// =================================================================

// ටිකට් එකට දත්ත පිරවීම
async function populateTicketData(uid) {
    try {
        const userDoc = await db.collection('users').doc(uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            const ticketId = 'INSP25-' + Date.now().toString().slice(-6);

            userDisplayName.textContent = userData.fullName.split(' ')[0]; // පළමු නම පමණක්
            ticketName.textContent = userData.fullName;
            ticketReg.textContent = userData.regNumber;
            ticketIdElement.textContent = ticketId;
        } else {
            console.error("User data not found in Firestore!");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// ටිකට් එක ඊමේල් කිරීමේ ශ්‍රිතය
async function generateAndSendTicket(regNumber, fullName, email) {
    // තාවකාලිකව ticket එකක් DOM එකට එකතු කරලා image එක generate කරගන්නවා
    const tempTicketDiv = document.createElement('div');
    tempTicketDiv.innerHTML = document.getElementById('ticket-template-for-js').innerHTML; // We need a template
    document.body.appendChild(tempTicketDiv);

    tempTicketDiv.querySelector('#ticket-name-js').textContent = fullName;
    tempTicketDiv.querySelector('#ticket-reg-js').textContent = regNumber;
    const ticketId = 'INSP25-' + Date.now().toString().slice(-6);
    tempTicketDiv.querySelector('#ticket-id-js').textContent = ticketId;

    const canvas = await html2canvas(tempTicketDiv.querySelector('.ticket-gradient-js'), { scale: 2, useCORS: true });
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.98);
    document.body.removeChild(tempTicketDiv); // තාවකාලික div එක ඉවත් කිරීම

    const payload = { regNumber, fullName, email, ticketId, imageData: imageDataUrl };

    await fetch(appsScriptUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    });
}


// Download Ticket Functionality
if (isTicketPage && downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        const ticketElement = document.getElementById('ticket');
        const studentName = ticketName.textContent.replace(/ /g, '_');
        const regNumber = ticketReg.textContent.replace(/\//g, '-');
        
        html2canvas(ticketElement, { scale: 2, useCORS: true }).then(canvas => {
            const link = document.createElement('a');
            link.download = `INSPIRA'25_Ticket_${regNumber}_${studentName}.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.98);
            link.click();
        });
    });
}

// ටිකට් එක ඊමේල් කිරීමට අවශ්‍ය Template එකක් HTML එකට එකතු කිරීම
// `index.html` එකේ `</body>` එකට කලින් මේක දාන්න
const ticketTemplate = `
<div id="ticket-template-for-js" style="position: absolute; left: -9999px; width: 450px;">
 <div class="ticket-gradient-js" style="background: linear-gradient(135deg, #874C1B, #6B2E2E, #541C1C); color: white; border-radius: 1rem; overflow: hidden;">
    <div style="padding: 2rem;">
        <div>
            <h1 style="font-size: 2.5rem; font-weight: 900; text-transform: uppercase;">INSPIRA<span style="color: #FDBA74;">'25</span></h1>
            <p>English Speech Club 23/24</p>
        </div>
        <div style="margin-top: 2rem;">
            <p style="text-transform: uppercase; font-size: 0.875rem;">Admittee:</p>
            <h2 id="ticket-name-js" style="font-size: 1.5rem; font-weight: 700;"></h2>
            <p id="ticket-reg-js"></p>
        </div>
        <div style="margin-top: 1.5rem; border-top: 2px dashed rgba(255,255,255,0.2); padding-top: 1.5rem; display: flex; justify-content: space-between;">
            <div>
                <p style="text-transform: uppercase; font-size: 0.875rem;">Date & Time</p>
                <p style="font-weight: 600;">Oct 1, 2025 | 09:00 AM</p>
            </div>
            <div style="text-align: right;">
                <p style="text-transform: uppercase; font-size: 0.875rem;">Venue</p>
                <p style="font-weight: 600;">ZOOM</p>
            </div>
        </div>
    </div>
    <div style="background-color: rgba(0,0,0,0.2); padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
            <p style="font-size: 0.75rem;">Ticket ID:</p>
            <p id="ticket-id-js" style="font-family: monospace;"></p>
        </div>
    </div>
</div>
</div>
`;
if(isIndexPage){
    document.body.insertAdjacentHTML('beforeend', ticketTemplate);
}