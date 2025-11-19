# ✨ COSMIC HOROSCOPES 2026 ✨

A humorous daily horoscope website with a gloriously trashy mystical aesthetic.

## 🌟 Features

- **12 Zodiac Signs** with beautiful Unicode symbols
- **Daily Horoscopes** that change every day
- **Today & Tomorrow** predictions
- **Three Score Categories**: Love 💖, Finance & Career 💰, Health 🌿
- **Animated Cosmic Background** with twinkling stars
- **Glowing Effects** and rainbow gradients
- **Responsive Design** for mobile and desktop

## 🚀 Quick Start

### Local Development

1. Open a terminal in the project directory
2. Start a local server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser to `http://localhost:8000`

### Deploy to GitHub Pages (Free Hosting!)

1. Create a new repository on GitHub
2. Initialize and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/cosmic-horoscopes.git
   git branch -M main
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Select "main" branch as source
5. Your site will be live at `https://YOUR_USERNAME.github.io/cosmic-horoscopes/`

## 📝 Adding New Horoscopes

Edit `horoscopes.json` and add new entries:

```json
{
  "aries": [
    {
      "text": "Your humorous horoscope text here...",
      "love": 7,
      "finance": 4,
      "health": 9
    }
  ]
}
```

- **text**: The horoscope message (be creative and nonsensical!)
- **love**: Score 1-10 for romantic success
- **finance**: Score 1-10 for career and money
- **health**: Score 1-10 for wellness

The more horoscopes you add per sign, the more variety users will see!

## 🎨 Design Philosophy

This website embraces a "trashy fortune teller" aesthetic with:
- Over-the-top glowing effects
- Excessive gradients and sparkles
- Mystical fonts (Cinzel Decorative + Philosopher)
- Vibrant cosmic colors (purples, pinks, golds, cyans)
- Animated everything!

## 📁 File Structure

```
horoscope/
├── index.html          # Main page with zodiac selection
├── horoscope.html      # Individual horoscope display
├── style.css           # All the glorious CSS
├── script.js           # Horoscope logic and animations
├── horoscopes.json     # Horoscope data (edit this!)
└── README.md           # This file
```

## 🔮 How It Works

1. **Daily Rotation**: Horoscopes are selected using a date-based hash function, ensuring the same horoscope shows all day
2. **Multiple Horoscopes**: Each sign has 5 horoscopes that rotate over different days
3. **Score Visualization**: Animated progress bars show the three life categories
4. **Today/Tomorrow**: Users can peek at tomorrow's cosmic destiny

## 🌈 Sample Horoscopes

- "Your socks will achieve sentience today. They demand better treatment and threaten to run away."
- "Mercury is in retrograde with your refrigerator. All your leftovers will taste like Wednesday."
- "The moon suggests you should argue with a vending machine. You will lose, but gain spiritual enlightenment."

## 📱 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

## 🎯 Future Ideas

- Social sharing buttons
- Zodiac compatibility checker
- Lucky numbers generator
- Sound effects (mystical chimes!)
- Even MORE sparkles

## 📄 License

Free to use and modify. May the cosmos guide you! ✨

---

**Created with cosmic energy and questionable design choices** 🌟
