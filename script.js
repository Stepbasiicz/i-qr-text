document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qrContentInput = document.getElementById('qrContent');
    const fillTextInput = document.getElementById('fillText');
    const fontScaleInput = document.getElementById('fontScale');
    const fontWeightInput = document.getElementById('fontWeight');
    const logoInput = document.getElementById('logoInput');
    const labelTopInput = document.getElementById('labelTop');
    const labelBottomInput = document.getElementById('labelBottom');
    const labelLeftInput = document.getElementById('labelLeft');
    const labelRightInput = document.getElementById('labelRight');
    const sameLabelCheckbox = document.getElementById('sameLabel');
    const canvas = document.getElementById('qrCanvas');
    const ctx = canvas.getContext('2d');

    let logoImage = null;

    // Default generation
    generateQRCode();

    generateBtn.addEventListener('click', generateQRCode);
    
    // Add real-time update listeners for better UX
    qrContentInput.addEventListener('input', debounce(generateQRCode, 500));
    fillTextInput.addEventListener('input', debounce(generateQRCode, 300));
    fontScaleInput.addEventListener('input', generateQRCode);
    fontWeightInput.addEventListener('change', generateQRCode);
    
    // Listen for label changes
    [labelTopInput, labelBottomInput, labelLeftInput, labelRightInput].forEach(input => {
        input.addEventListener('input', () => {
            if (sameLabelCheckbox.checked && input === labelTopInput) {
                syncLabels();
            }
            debounce(generateQRCode, 300)();
        });
    });

    sameLabelCheckbox.addEventListener('change', () => {
        if (sameLabelCheckbox.checked) {
            syncLabels();
            // Optional: Disable other inputs
            labelBottomInput.disabled = true;
            labelLeftInput.disabled = true;
            labelRightInput.disabled = true;
        } else {
            // Optional: Enable other inputs
            labelBottomInput.disabled = false;
            labelLeftInput.disabled = false;
            labelRightInput.disabled = false;
        }
        generateQRCode();
    });

    function syncLabels() {
        const val = labelTopInput.value;
        labelBottomInput.value = val;
        labelLeftInput.value = val;
        labelRightInput.value = val;
    }
    
    logoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    logoImage = img;
                    generateQRCode();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            logoImage = null;
            generateQRCode();
        }
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'text-qr-code.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    function generateQRCode() {
        const content = qrContentInput.value.trim() || 'https://example.com';
        const fillText = fillTextInput.value.trim() || 'A';
        const scale = parseFloat(fontScaleInput.value);
        const fontWeight = fontWeightInput.value;

        // Labels
        const labelTop = labelTopInput.value.trim();
        const labelBottom = labelBottomInput.value.trim();
        const labelLeft = labelLeftInput.value.trim();
        const labelRight = labelRightInput.value.trim();
        const hasLabels = labelTop || labelBottom || labelLeft || labelRight;

        try {
            // Use Type 0 (Auto), Error Correction Level H (High) - best for custom QRs
            const qr = qrcode(0, 'H');
            qr.addData(content);
            qr.make();

            const moduleCount = qr.getModuleCount();
            
            // Set high resolution for canvas
            const baseSize = 1000;
            const labelMargin = hasLabels ? 150 : 0; // Margin for text
            const totalSize = baseSize + (labelMargin * 2);
            
            canvas.width = totalSize;
            canvas.height = totalSize;
            
            // Display size via CSS can be smaller, but internal resolution is high
            canvas.style.width = '400px';
            canvas.style.height = '400px';

            const cellSize = baseSize / moduleCount;

            // Clear canvas
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, totalSize, totalSize);
            
            // Draw Labels (Frame)
            if (hasLabels) {
                ctx.fillStyle = '#000000';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const labelFontSize = 60;
                ctx.font = `bold ${labelFontSize}px 'Kanit', sans-serif`;
                
                // Top
                if (labelTop) {
                    ctx.fillText(labelTop, totalSize / 2, labelMargin / 2);
                }
                
                // Bottom
                if (labelBottom) {
                    ctx.fillText(labelBottom, totalSize / 2, totalSize - (labelMargin / 2));
                }
                
                // Left (Rotated -90 degrees)
                if (labelLeft) {
                    ctx.save();
                    ctx.translate(labelMargin / 2, totalSize / 2);
                    ctx.rotate(-Math.PI / 2);
                    ctx.fillText(labelLeft, 0, 0);
                    ctx.restore();
                }
                
                // Right (Rotated 90 degrees)
                if (labelRight) {
                    ctx.save();
                    ctx.translate(totalSize - (labelMargin / 2), totalSize / 2);
                    ctx.rotate(Math.PI / 2);
                    ctx.fillText(labelRight, 0, 0);
                    ctx.restore();
                }
            }

            // Offset context for QR drawing
            ctx.save();
            ctx.translate(labelMargin, labelMargin);

            // Configure Text
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Dynamic font size calculation
            // We want the text to roughly fit the cell. 
            // 1em usually approximates the height.
            const fontSize = cellSize * scale;
            ctx.font = `${fontWeight} ${fontSize}px 'Kanit', sans-serif`;

            // Helper to identify Finder Patterns (3 corners) & Timing Patterns
            // Also attempts to cover Alignment Patterns for better scannability
            const isFunctionalPattern = (r, c) => {
                // Finder Patterns (7x7)
                const TOP_LEFT = r < 7 && c < 7;
                const TOP_RIGHT = r < 7 && c >= moduleCount - 7;
                const BOTTOM_LEFT = r >= moduleCount - 7 && c < 7;
                
                // Timing Patterns (Row 6 and Col 6)
                const TIMING = r === 6 || c === 6;

                // Alignment Patterns Protection (Heuristic)
                // Alignment patterns usually have a center at (r,c) where isDark is true, 
                // surrounded by light, surrounded by dark. 
                // However, detecting this dynamically is complex. 
                // A simpler approach for V1-V10 (most text QRs) is to check if it's "isolated" or part of a distinctive structure.
                // But relying on "Stroke" text is usually enough.
                
                return TOP_LEFT || TOP_RIGHT || BOTTOM_LEFT || TIMING;
            };

            for (let r = 0; r < moduleCount; r++) {
                for (let c = 0; c < moduleCount; c++) {
                    if (qr.isDark(r, c)) {
                        const x = c * cellSize;
                        const y = r * cellSize;
                        
                        if (isFunctionalPattern(r, c)) {
                            // Draw solid blocks for finder patterns (critical for scanning)
                            ctx.fillRect(x, y, cellSize + 0.5, cellSize + 0.5); 
                        } else {
                            // Draw text for data modules
                            const centerX = x + (cellSize / 2);
                            const centerY = y + (cellSize / 2);
                            
                            // Make text act more like a block:
                            // 1. Draw text
                            ctx.fillText(fillText, centerX, centerY);
                            
                            // 2. Add stroke to make it "fatter" (improves scanning density)
                            ctx.lineWidth = fontSize * 0.05; // 5% stroke
                            ctx.strokeStyle = '#000000';
                            ctx.strokeText(fillText, centerX, centerY);
                        }
                    }
                }
            }

                // Draw Logo if exists
            if (logoImage) {
                const logoSize = baseSize * 0.22; // 22% of QR size (safe for Level H)
                const logoX = (baseSize - logoSize) / 2;
                const logoY = (baseSize - logoSize) / 2;

                // Draw white background for logo
                ctx.fillStyle = '#FFFFFF';
                // Add a small padding
                const padding = 10;
                ctx.fillRect(logoX - padding, logoY - padding, logoSize + (padding * 2), logoSize + (padding * 2));

                // Draw Logo
                ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
            }
            
            // Restore context after QR drawing
            ctx.restore();

            downloadBtn.classList.remove('hidden');

        } catch (err) {
            console.error(err);
            alert('Error generating QR Code. Text might be too long for this version.');
        }
    }

    // Utility for debouncing input
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});
