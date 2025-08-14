class AdvancedCalculator {
    constructor() {
        this.currentInput = '';
        this.previousInput = '';
        this.operator = '';
        this.memory = 0;
        this.history = [];
        this.isScientificMode = false;
        this.isDegreeMode = true;
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadFromStorage();
    }

    initializeElements() {
        this.inputBox = document.getElementById('inputBox');
        this.historyDisplay = document.getElementById('history');
        this.memoryIndicator = document.getElementById('memoryIndicator');
        this.scientificFunctions = document.getElementById('scientificFunctions');
        this.historyPanel = document.getElementById('historyPanel');
        this.historyList = document.getElementById('historyList');
        this.buttons = document.querySelectorAll('.button');
    }

    attachEventListeners() {
        // Button clicks
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.handleButtonClick(e));
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Scientific mode toggle
        document.getElementById('scientificToggle').addEventListener('click', () => this.toggleScientificMode());

        // Memory controls
        document.getElementById('mc').addEventListener('click', () => this.memoryClear());
        document.getElementById('mr').addEventListener('click', () => this.memoryRecall());
        document.getElementById('mplus').addEventListener('click', () => this.memoryAdd());
        document.getElementById('mminus').addEventListener('click', () => this.memorySubtract());
        document.getElementById('ms').addEventListener('click', () => this.memoryStore());

        // History controls
        document.getElementById('clearHistory').addEventListener('click', () => this.clearHistory());

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // History panel toggle (double-click on display)
        this.inputBox.addEventListener('dblclick', () => this.toggleHistoryPanel());
    }

    handleButtonClick(e) {
        const value = e.target.textContent;
        const id = e.target.id;

        // Add ripple effect
        this.addRippleEffect(e.target, e);

        switch(id) {
            case 'ac':
                this.allClear();
                break;
            case 'del':
                this.delete();
                break;
            case 'equals':
                this.calculate();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
            case 'percent':
                this.setOperator(this.getOperatorSymbol(id));
                break;
            // Scientific functions
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
            case 'ln':
            case 'sqrt':
                this.scientificFunction(id);
                break;
            case 'power':
                this.setOperator('^');
                break;
            case 'pi':
                this.inputNumber(Math.PI.toString());
                break;
            default:
                if (!isNaN(value) || value === '.' || value === '00') {
                    this.inputNumber(value);
                }
        }
    }

    getOperatorSymbol(id) {
        const symbols = {
            'add': '+',
            'subtract': '-',
            'multiply': '*',
            'divide': '/',
            'percent': '%'
        };
        return symbols[id];
    }

    inputNumber(num) {
        if (num === '00' && this.currentInput === '') return;
        if (num === '.' && this.currentInput.includes('.')) return;
        
        this.currentInput += num;
        this.updateDisplay();
    }

    setOperator(op) {
        if (this.currentInput === '' && this.previousInput === '') return;
        
        if (this.previousInput !== '' && this.currentInput !== '' && this.operator !== '') {
            this.calculate();
        }
        
        this.operator = op;
        this.previousInput = this.currentInput || this.previousInput;
        this.currentInput = '';
        this.updateHistory(`${this.previousInput} ${op}`);
    }

    calculate() {
        if (this.previousInput === '' || this.operator === '') return;
        
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput) || prev;
        let result;

        try {
            switch(this.operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) throw new Error('Division by zero');
                    result = prev / current;
                    break;
                case '%':
                    result = prev % current;
                    break;
                case '^':
                    result = Math.pow(prev, current);
                    break;
                default:
                    return;
            }

            const expression = `${this.previousInput} ${this.operator} ${this.currentInput}`;
            this.addToHistory(expression, result);
            
            this.currentInput = this.formatResult(result);
            this.previousInput = '';
            this.operator = '';
            this.updateDisplay();
            this.updateHistory('');
            
        } catch (error) {
            this.showError('Error');
        }
    }

    scientificFunction(func) {
        const current = parseFloat(this.currentInput) || 0;
        let result;

        try {
            switch(func) {
                case 'sin':
                    result = Math.sin(this.isDegreeMode ? current * Math.PI / 180 : current);
                    break;
                case 'cos':
                    result = Math.cos(this.isDegreeMode ? current * Math.PI / 180 : current);
                    break;
                case 'tan':
                    result = Math.tan(this.isDegreeMode ? current * Math.PI / 180 : current);
                    break;
                case 'log':
                    if (current <= 0) throw new Error('Invalid input');
                    result = Math.log10(current);
                    break;
                case 'ln':
                    if (current <= 0) throw new Error('Invalid input');
                    result = Math.log(current);
                    break;
                case 'sqrt':
                    if (current < 0) throw new Error('Invalid input');
                    result = Math.sqrt(current);
                    break;
            }

            const expression = `${func}(${current})`;
            this.addToHistory(expression, result);
            
            this.currentInput = this.formatResult(result);
            this.updateDisplay();
            
        } catch (error) {
            this.showError('Error');
        }
    }

    formatResult(result) {
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid result');
        }
        
        // Handle very large or very small numbers
        if (Math.abs(result) > 1e10 || (Math.abs(result) < 1e-6 && result !== 0)) {
            return result.toExponential(6);
        }
        
        // Round to avoid floating point errors
        return parseFloat(result.toPrecision(12)).toString();
    }

    allClear() {
        this.currentInput = '';
        this.previousInput = '';
        this.operator = '';
        this.updateDisplay();
        this.updateHistory('');
    }

    delete() {
        this.currentInput = this.currentInput.slice(0, -1);
        this.updateDisplay();
    }

    // Memory functions
    memoryClear() {
        this.memory = 0;
        this.updateMemoryIndicator();
    }

    memoryRecall() {
        this.currentInput = this.memory.toString();
        this.updateDisplay();
    }

    memoryAdd() {
        this.memory += parseFloat(this.currentInput) || 0;
        this.updateMemoryIndicator();
    }

    memorySubtract() {
        this.memory -= parseFloat(this.currentInput) || 0;
        this.updateMemoryIndicator();
    }

    memoryStore() {
        this.memory = parseFloat(this.currentInput) || 0;
        this.updateMemoryIndicator();
    }

    updateMemoryIndicator() {
        if (this.memory !== 0) {
            this.memoryIndicator.classList.add('active');
        } else {
            this.memoryIndicator.classList.remove('active');
        }
    }

    // Display updates
    updateDisplay() {
        this.inputBox.value = this.currentInput || '0';
        this.inputBox.classList.remove('error');
    }

    updateHistory(text) {
        this.historyDisplay.textContent = text;
    }

    showError(message) {
        this.inputBox.value = message;
        this.inputBox.classList.add('error');
        this.currentInput = '';
        this.previousInput = '';
        this.operator = '';
        
        setTimeout(() => {
            this.inputBox.classList.remove('error');
            this.updateDisplay();
        }, 2000);
    }

    // History management
    addToHistory(expression, result) {
        const historyItem = {
            expression,
            result: this.formatResult(result),
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.history.unshift(historyItem);
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        this.updateHistoryDisplay();
        this.saveToStorage();
    }

    updateHistoryDisplay() {
        this.historyList.innerHTML = '';
        this.history.forEach(item => {
            const historyElement = document.createElement('div');
            historyElement.className = 'history-item';
            historyElement.innerHTML = `
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
            `;
            historyElement.addEventListener('click', () => {
                this.currentInput = item.result;
                this.updateDisplay();
                this.toggleHistoryPanel();
            });
            this.historyList.appendChild(historyElement);
        });
    }

    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
        this.saveToStorage();
    }

    toggleHistoryPanel() {
        this.historyPanel.classList.toggle('active');
    }

    // Theme and mode toggles
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        
        localStorage.setItem('calculatorTheme', newTheme);
    }

    toggleScientificMode() {
        this.isScientificMode = !this.isScientificMode;
        this.scientificFunctions.classList.toggle('active', this.isScientificMode);
        
        const modeBtn = document.getElementById('scientificToggle');
        modeBtn.innerHTML = this.isScientificMode ? 
            '<i class="fas fa-calculator"></i> Basic' : 
            '<i class="fas fa-flask"></i> Scientific';
    }

    // Keyboard support
    handleKeyboard(e) {
        e.preventDefault();
        
        const key = e.key;
        const keyMap = {
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
            '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
            '.': 'decimal',
            '+': 'add',
            '-': 'subtract',
            '*': 'multiply',
            '/': 'divide',
            '%': 'percent',
            'Enter': 'equals',
            '=': 'equals',
            'Escape': 'ac',
            'Backspace': 'del'
        };

        if (keyMap[key]) {
            const button = document.getElementById(keyMap[key]) || 
                          document.querySelector(`[id="${key}"]`);
            if (button) {
                button.click();
            }
        }
    }

    // Visual effects
    addRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Storage
    saveToStorage() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
        localStorage.setItem('calculatorMemory', this.memory.toString());
    }

    loadFromStorage() {
        const savedHistory = localStorage.getItem('calculatorHistory');
        const savedMemory = localStorage.getItem('calculatorMemory');
        const savedTheme = localStorage.getItem('calculatorTheme');
        
        if (savedHistory) {
            this.history = JSON.parse(savedHistory);
            this.updateHistoryDisplay();
        }
        
        if (savedMemory) {
            this.memory = parseFloat(savedMemory);
            this.updateMemoryIndicator();
        }
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            const themeIcon = document.querySelector('#themeToggle i');
            themeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedCalculator();
});