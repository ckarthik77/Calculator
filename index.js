document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.getElementById('inputBox');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;
            
            if (value === 'AC') {
                currentInput = '';
                inputBox.value = '0';
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                inputBox.value = currentInput || '0';
            } else if (value === '=') {
                try {
                    currentInput = eval(currentInput).toString();
                    inputBox.value = currentInput;
                } catch {
                    inputBox.value = 'Error';
                    currentInput = '';
                }
            } else {
                currentInput += value;
                inputBox.value = currentInput;
            }
        });
    });
});