# 🧮 Modern Calculator Web App

![Calculator Preview](screenshot.png)  
*A sleek, responsive calculator with dark theme and smooth animations*

## ✨ Features

### 🧰 Core Functionality
- **Basic Operations**: +, -, ×, ÷ with proper order of operations
- **Advanced Functions**: Percentage (%), plus/minus toggle (±)
- **Memory Controls**: DEL (backspace) and AC (full reset)
- **Error Handling**: Clear messages for division by zero and invalid inputs

### 🎨 Design Excellence
- **Dark Mode UI**: Eye-friendly gradient background
- **Interactive Elements**: 
  - Button press animations
  - Visual feedback on hover
  - Dynamic display scaling
- **Responsive Layout**: Perfectly adapts from mobile to 4K displays

### ⌨️ Input Options
- Mouse/touch controls
- Full keyboard support (numpad friendly)
- Mobile-optimized large touch targets

## 🚀 Technologies Used

| Frontend       | Details                          |
|----------------|----------------------------------|
| **HTML5**      | Semantic structure               |
| **CSS3**       | Flexbox, CSS Variables, Animations |
| **JavaScript** | ES6+ with clean MVC architecture |

## 🌐 Live Demo

[![Demo Button](https://img.shields.io/badge/🚀_Try_Live_Demo-FF7139?style=for-the-badge)](https://your-deployed-app.link)  
*Hosted on Netlify/Vercel for instant access*

## 🛠️ Installation & Setup

```bash
# Clone with SSH
git clone git@github.com:CKarthik77/calculator.git

# Or with HTTPS
git clone https://github.com/CKarthik77/calculator.git

# Install dependencies (none required for this pure JS project)
cd calculator

# Launch in browser
open index.html  # Mac
start index.html # Windows
xdg-open index.html # Linux
```

## 📱 Responsive Support

| Device        | Tested On       |
|---------------|-----------------|
| Mobile        | iPhone 13, Pixel 6 |
| Tablet        | iPad Air        |
| Desktop       | 4K monitors     |
| Special Cases | Foldable devices|

## 🏗️ Project Structure

```
calculator/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── index.html
├── LICENSE
└── README.md
```

## 🌟 Special Features

```javascript
// Example of innovative feature implementation
function handlePercentage() {
  // Converts current value to percentage of previous operand
  return currentValue / 100 * previousValue;
}
```

## 🤝 Contributing

We welcome contributions! Please follow our guidelines:

1. **Fork** the repository
2. **Branch** naming:  
   `feat/` for features  
   `fix/` for bug fixes  
   `docs/` for documentation
3. **Test** your changes thoroughly
4. Submit a **Pull Request** with:
   - Description of changes
   - Screenshots if UI-related
   - Reference to related issues

## 📜 License

MIT Licensed - See [LICENSE](LICENSE) for full details.

## 📬 Contact

**Karthik C**  
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github)](https://github.com/CKarthik77)  
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail)](mailto:your.email@example.com)

---

<div align="center">
  <sub>Built with ❤️ and JavaScript</sub> | 
  <sub>Consider starring ⭐ if you find this useful!</sub>
</div>