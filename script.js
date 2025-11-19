// Zodiac sign data
const zodiacData = {
    aries: { name: 'Aries', icon: '♈', dates: 'Mar 21 - Apr 19' },
    taurus: { name: 'Taurus', icon: '♉', dates: 'Apr 20 - May 20' },
    gemini: { name: 'Gemini', icon: '♊', dates: 'May 21 - Jun 20' },
    cancer: { name: 'Cancer', icon: '♋', dates: 'Jun 21 - Jul 22' },
    leo: { name: 'Leo', icon: '♌', dates: 'Jul 23 - Aug 22' },
    virgo: { name: 'Virgo', icon: '♍', dates: 'Aug 23 - Sep 22' },
    libra: { name: 'Libra', icon: '♎', dates: 'Sep 23 - Oct 22' },
    scorpio: { name: 'Scorpio', icon: '♏', dates: 'Oct 23 - Nov 21' },
    sagittarius: { name: 'Sagittarius', icon: '♐', dates: 'Nov 22 - Dec 21' },
    capricorn: { name: 'Capricorn', icon: '♑', dates: 'Dec 22 - Jan 19' },
    aquarius: { name: 'Aquarius', icon: '♒', dates: 'Jan 20 - Feb 18' },
    pisces: { name: 'Pisces', icon: '♓', dates: 'Feb 19 - Mar 20' }
};

// Load horoscopes from JSON
let horoscopesData = {};

// Epoch date for horoscope rotation: November 19, 2025
const EPOCH_DATE = new Date(2025, 10, 19); // Month is 0-indexed, so 10 = November

// Zodiac signs in fixed order for rotation
const ZODIAC_ORDER = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

// Initialize on index page
if (document.querySelector('.zodiac-grid')) {
    const zodiacCards = document.querySelectorAll('.zodiac-card');
    zodiacCards.forEach(card => {
        card.addEventListener('click', () => {
            const sign = card.dataset.sign;
            window.location.href = `horoscope.html?sign=${sign}`;
        });
    });

    // Set current date in German
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('de-DE', options);
    }
}

// Initialize on horoscope page
if (document.querySelector('.horoscope-page')) {
    loadHoroscopes();
}

async function loadHoroscopes() {
    try {
        const response = await fetch('horoscopes.json');
        horoscopesData = await response.json();
        displayHoroscope('today');
    } catch (error) {
        console.error('Error loading horoscopes:', error);
        document.getElementById('horoscope-text').textContent =
            'The cosmic energies are temporarily unavailable. Please refresh the page.';
    }
}

function calculateDaysSinceEpoch(date) {
    const timeDiff = date.getTime() - EPOCH_DATE.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}

function getRotatedZodiacSign(originalSign, daysSinceEpoch) {
    const N = 10; // Number of horoscopes per zodiac sign
    const originalIndex = ZODIAC_ORDER.indexOf(originalSign);

    // Calculate which zodiac sign's horoscopes to use
    const rotationOffset = Math.floor(daysSinceEpoch / N) % 12;
    const sourceIndex = (originalIndex + rotationOffset) % 12;

    return ZODIAC_ORDER[sourceIndex];
}

function getGeneralHoroscope(sign, date) {
    if (!horoscopesData.generalHoroscopes) return null;

    const daysSinceEpoch = calculateDaysSinceEpoch(date);
    const N = 10; // Number of horoscopes per zodiac sign

    // Determine which horoscope index to show (0-9)
    const horoscopeIndex = daysSinceEpoch % N;

    // Determine which zodiac sign's horoscopes to use
    const sourceSign = getRotatedZodiacSign(sign, daysSinceEpoch);

    const horoscopes = horoscopesData.generalHoroscopes[sourceSign];
    if (!horoscopes || horoscopeIndex >= horoscopes.length) return null;

    return horoscopes[horoscopeIndex];
}

function getCategoryHoroscope(category, sign, date) {
    if (!horoscopesData.categoryHoroscopes || !horoscopesData.categoryHoroscopes[category]) {
        return null;
    }

    const categoryPool = horoscopesData.categoryHoroscopes[category];
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    // Create hash from date, sign, and category to ensure:
    // 1. Same result for same day and same sign
    // 2. Different results for different categories
    // 3. Different results for different signs on the same day
    const hash = simpleHash(dateString + sign + category);
    const index = hash % categoryPool.length;

    return categoryPool[index];
}

function displayHoroscope(day) {
    const urlParams = new URLSearchParams(window.location.search);
    const sign = urlParams.get('sign');

    if (!sign || !zodiacData[sign]) {
        window.location.href = 'index.html';
        return;
    }

    // Update header
    const signData = zodiacData[sign];
    document.getElementById('sign-icon').textContent = signData.icon;
    document.getElementById('sign-name').textContent = signData.name;
    document.getElementById('sign-dates').textContent = signData.dates;
    document.getElementById('page-title').textContent = `${signData.name} Horoscope ✨`;

    // Calculate date
    const date = new Date();
    if (day === 'tomorrow') {
        date.setDate(date.getDate() + 1);
    }

    // Get general horoscope
    const generalText = getGeneralHoroscope(sign, date);

    if (generalText) {
        // Animate text change
        const textElement = document.getElementById('horoscope-text');
        textElement.style.animation = 'none';
        setTimeout(() => {
            textElement.textContent = generalText;
            textElement.style.animation = 'fadeIn 1s ease';
        }, 10);
    }

    // Get and update category horoscopes
    const loveHoroscope = getCategoryHoroscope('love', sign, date);
    const financeHoroscope = getCategoryHoroscope('finance', sign, date);
    const healthHoroscope = getCategoryHoroscope('health', sign, date);

    if (loveHoroscope) {
        updateScore('love', loveHoroscope.value, loveHoroscope.text);
    }
    if (financeHoroscope) {
        updateScore('finance', financeHoroscope.value, financeHoroscope.text);
    }
    if (healthHoroscope) {
        updateScore('health', healthHoroscope.value, healthHoroscope.text);
    }
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

function updateScore(type, value, predictionText) {
    const fillElement = document.getElementById(`${type}-score`);
    const valueElement = document.getElementById(`${type}-value`);
    const predictionElement = document.getElementById(`${type}-prediction`);

    // Animate the score bar
    setTimeout(() => {
        fillElement.style.width = `${value * 10}%`;
        valueElement.textContent = `${value}/10`;

        // Use the prediction text from the category horoscope
        if (predictionElement && predictionText) {
            predictionElement.textContent = predictionText;
        }
    }, 300);
}

// Toggle between today and tomorrow
if (document.querySelector('.day-toggle')) {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            toggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Display horoscope for selected day
            const day = btn.dataset.day;
            displayHoroscope(day);
        });
    });
}
