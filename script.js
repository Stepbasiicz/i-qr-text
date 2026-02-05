document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qrContentInput = document.getElementById('qrContent');
    const fillTextInput = document.getElementById('fillText');
    const fontScaleInput = document.getElementById('fontScale');
    const fontWeightInput = document.getElementById('fontWeight');
    const qrColorInput = document.getElementById('qrColor');
    const colorValueDisplay = document.getElementById('colorValue');
    const logoInput = document.getElementById('logoInput');
    const labelTopInput = document.getElementById('labelTop');
    const labelBottomInput = document.getElementById('labelBottom');
    const labelLeftInput = document.getElementById('labelLeft');
    const labelRightInput = document.getElementById('labelRight');
    const sameLabelCheckbox = document.getElementById('sameLabel');
    const cornerStyleInput = document.getElementById('cornerStyle');
    const frameStyleInput = document.getElementById('frameStyle');
    const frameTextInput = document.getElementById('frameText');
    const frameTextGroup = document.getElementById('frameTextGroup');
    const canvas = document.getElementById('qrCanvas');
    const ctx = canvas.getContext('2d');
    const langBtns = document.querySelectorAll('.lang-btn');
    const cornerBtns = document.querySelectorAll('.corner-btn');
    const frameBtns = document.querySelectorAll('.frame-btn');

    let logoImage = null;
    let currentLang = 'th'; // Default language
    const supportedLangs = ['th', 'en', 'cn', 'jp'];

    // Language Dictionary
    const translations = {
        en: {
            subtitle: 'Turn your QR Code into <span class="text-pink-500 font-medium">"YOUR WORDS"</span>',
            contentLabel: 'Link or Content',
            fillLabel: 'Fill Text',
            appearanceTitle: 'Appearance Settings',
            scaleLabel: 'FONT SCALE',
            small: 'Small',
            large: 'Large',
            weightLabel: 'FONT WEIGHT',
            normal: 'Normal',
            bold: 'Bold',
            extraBold: 'Extra Bold',
            colorLabel: 'TEXT COLOR',
            logoLabel: 'CENTER LOGO',
            uploadText: 'Click to Upload Logo',
            frameTitle: 'Frame Labels',
            sameLabel: 'Use Same Text',
            generateBtn: 'Generate QR Code',
            downloadBtn: 'Save Image',
            privacyTitle: '100% Secure & Private',
            privacyText: 'We do not store any of your personal data, images, or text. All processing happens directly on your device (Client-side) for your peace of mind and safety.',
            tip: 'Tip: Short and bold text scans best! (If text overlaps, reduce font size to minimum)',
            likeTool: 'Like this tool?',
            projectDisclaimer: 'Just for fun! 🥳 Wishing you happiness every day.',
            coffeeText: 'If you\'re happy with this, a coffee would make us happy too! ☕️',
             buyCoffeeBtn: 'Buy me a Coffee',
             visitorLabel: 'Total Visits:',
             exampleTitle: 'Real Example',
            exampleDesc: 'Try scanning this!',
            popularTagsTitle: 'Popular Searches',
            cornerStyleLabel: 'CORNER STYLE',
            frameStyleLabel: 'FRAME STYLE',
            frameTextLabel: 'FRAME TEXT'
        },
        th: {
            subtitle: 'เปลี่ยน QR Code ธรรมดา ให้เป็น <span class="text-pink-500 font-medium">"คำพูด"</span> ของคุณ',
            contentLabel: 'ลิงก์หรือข้อความ (Content)',
            fillLabel: 'คำที่ใช้แทนจุด (Fill Text)',
            appearanceTitle: 'ปรับแต่งความสวยงาม',
            scaleLabel: 'ขนาดตัวอักษร',
            small: 'เล็ก',
            large: 'ใหญ่',
            weightLabel: 'ความหนา',
            normal: 'Normal (ปกติ)',
            bold: 'Bold (หนา)',
            extraBold: 'Extra Bold (หนามาก)',
            colorLabel: 'สีตัวอักษร',
            logoLabel: 'โลโก้ตรงกลาง',
            uploadText: 'คลิกเพื่ออัปโหลดโลโก้',
            frameTitle: 'ป้ายข้อความรอบด้าน',
            sameLabel: 'ใช้ข้อความเดียวกัน',
            generateBtn: 'สร้าง QR Code',
            downloadBtn: 'บันทึกรูปภาพ',
            privacyTitle: 'ความปลอดภัย 100%',
            privacyText: 'เว็บนี้ไม่มีการเก็บข้อมูลส่วนตัว รูปภาพ หรือข้อความของคุณ ข้อมูลทุกอย่างถูกประมวลผลบนเครื่องของคุณเอง (Client-side) เพื่อความสบายใจและความปลอดภัยสูงสุด',
            tip: 'Tip: ใช้คำสั้นๆ ตัวหนา (ถ้าทับกันให้ลดขนาดตัวอักษรลงเล็กสุด) จะสแกนง่ายขึ้นครับ',
            likeTool: 'ชอบเครื่องมือนี้ไหม?',
            projectDisclaimer: 'โปรเจกต์นี้ทำเพื่อความสนุก 🥳 ขอให้มีความสุขในทุกๆ วันนะครับ',
            coffeeText: 'ถ้าคุณมีความสุขกับเรา มอบกาแฟให้สักแก้ว ก็มีความสุขแล้วครับ ☕️',
            buyCoffeeBtn: 'เลี้ยงกาแฟเรา',
            visitorLabel: 'เข้าชมแล้ว:',
            exampleTitle: 'ตัวอย่างงานจริง',
            exampleDesc: 'ลองสแกนดูนะครับ!',
            popularTagsTitle: 'คำค้นหายอดฮิต',
            cornerStyleLabel: 'สไตล์มุม (Corner)',
            frameStyleLabel: 'กรอบ (Frame)',
            frameTextLabel: 'ข้อความบนกรอบ'
        },
        cn: {
            subtitle: '将普通二维码转换为您的<span class="text-pink-500 font-medium">"专属文字"</span>',
            contentLabel: '链接或内容 (Content)',
            fillLabel: '填充文字 (Fill Text)',
            appearanceTitle: '外观设置',
            scaleLabel: '字体大小',
            small: '小',
            large: '大',
            weightLabel: '字体粗细',
            normal: '正常',
            bold: '粗体',
            extraBold: '特粗',
            colorLabel: '文字颜色',
            logoLabel: '中心Logo',
            uploadText: '点击上传Logo',
            frameTitle: '边框文字',
            sameLabel: '使用相同文字',
            generateBtn: '生成二维码',
            downloadBtn: '保存图片',
            privacyTitle: '100% 安全隐私',
            privacyText: '本网站不存储您的任何个人数据、图片或文字。所有处理均在您的设备上直接进行（客户端），确保您的安心与安全。',
            tip: '提示：短且粗的文字扫描效果最好！（如果文字重叠，请将字体缩小至最小）',
            likeTool: '喜欢这个工具吗？',
            projectDisclaimer: '仅供娱乐！🥳 祝您天天开心。',
            coffeeText: '如果您喜欢这个工具，请我喝杯咖啡吧！☕️',
            buyCoffeeBtn: '请我喝咖啡',
            visitorLabel: '总访问量:',
            exampleTitle: '实际示例',
            exampleDesc: '试着扫描一下！',
            popularTagsTitle: '热门搜索',
            cornerStyleLabel: '角样式 (Corner)',
            frameStyleLabel: '边框样式 (Frame)',
            frameTextLabel: '边框文字'
        },
        jp: {
            subtitle: 'QRコードのドットをあなたの<span class="text-pink-500 font-medium">"言葉"</span>に変える',
            contentLabel: 'リンクまたはコンテンツ',
            fillLabel: '埋め込み文字',
            appearanceTitle: '外観設定',
            scaleLabel: '文字サイズ',
            small: '小',
            large: '大',
            weightLabel: '文字の太さ',
            normal: '標準',
            bold: '太字',
            extraBold: '極太',
            colorLabel: '文字色',
            logoLabel: '中央ロゴ',
            uploadText: 'ロゴをアップロード',
            frameTitle: 'フレーム文字',
            sameLabel: '同じ文字を使用',
            generateBtn: 'QRコードを作成',
            downloadBtn: '画像を保存',
            privacyTitle: '100% 安全・プライベート',
            privacyText: '当サイトは、個人データ、画像、テキストを一切保存しません。すべての処理はお使いのデバイス（クライアントサイド）で行われるため、安心してご利用いただけます。',
            tip: 'ヒント：短くて太い文字がスキャンしやすいです！（文字が重なる場合はサイズを最小にしてください）',
            likeTool: 'このツールが気に入りましたか？',
            projectDisclaimer: '楽しんでください！🥳 毎日が幸せでありますように。',
            coffeeText: 'もし気に入っていただけたら、コーヒーを一杯ご馳走してください！☕️',
            buyCoffeeBtn: 'コーヒーを奢る',
            visitorLabel: '総訪問数:',
            exampleTitle: '実例',
            exampleDesc: 'スキャンしてみてください！',
            popularTagsTitle: '人気の検索',
            cornerStyleLabel: '角のスタイル',
            frameStyleLabel: 'フレームスタイル',
            frameTextLabel: 'フレームのテキスト'
        }
    };

    // Language Buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.getAttribute('data-lang');
            updateLanguage();
        });
    });

    function updateLanguage() {
        // Update Buttons Styling
        langBtns.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === currentLang) {
                // Active State
                btn.className = 'lang-btn px-3 py-1.5 rounded-lg text-sm font-bold transition-all bg-indigo-600 text-white shadow-md transform scale-105';
            } else {
                // Inactive State
                btn.className = 'lang-btn px-3 py-1.5 rounded-lg text-sm font-bold transition-all border border-indigo-100 bg-white text-gray-400 hover:bg-indigo-50 hover:text-indigo-600';
            }
        });
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });

        // Update Placeholders
        const placeholders = {
            en: {
                qrContent: 'https://...',
                fillText: 'e.g. LOVE, HELLO',
                top: 'Top', bottom: 'Bottom', left: 'Left', right: 'Right'
            },
            th: {
                qrContent: 'https://...',
                fillText: 'เช่น LOVE, HELLO',
                top: 'ด้านบน', bottom: 'ด้านล่าง', left: 'ด้านซ้าย', right: 'ด้านขวา'
            },
            cn: {
                qrContent: 'https://...',
                fillText: '例如 LOVE, HELLO',
                top: '顶部', bottom: '底部', left: '左侧', right: '右侧'
            },
            jp: {
                qrContent: 'https://...',
                fillText: '例：LOVE, HELLO',
                top: '上', bottom: '下', left: '左', right: '右'
            }
        };

        const currentPlaceholders = placeholders[currentLang];
        document.getElementById('qrContent').placeholder = currentPlaceholders.qrContent;
        document.getElementById('fillText').placeholder = currentPlaceholders.fillText;
        document.getElementById('labelTop').placeholder = currentPlaceholders.top;
        document.getElementById('labelBottom').placeholder = currentPlaceholders.bottom;
        document.getElementById('labelLeft').placeholder = currentPlaceholders.left;
        document.getElementById('labelRight').placeholder = currentPlaceholders.right;

        // Update Popular Tags
        updatePopularTags();
    }

    function updatePopularTags() {
        const tags = {
            en: [
                'Free QR Code Generator', 'Text QR Code', 'Custom QR Code', 'No Signup', 
                'QR Code Art', 'High Quality QR', 'Client-side Secure', 'QR Code Dots as Text'
            ],
            th: [
                'สร้าง QR Code ฟรี', 'เปลี่ยนจุดเป็นตัวหนังสือ', 'คิวอาร์โค้ดสวยๆ', 
                'ไม่ต้องสมัครสมาชิก', 'ทำคิวอาร์โค้ดเอง', 'QR Code ข้อความ', 'โหลดฟรี'
            ],
            cn: [
                '二维码生成器', '免费二维码', '自定义文字', '在线制作', 
                '创意二维码', '无需注册', '高清二维码', '个性化设计'
            ],
            jp: [
                'QRコード作成', '無料QRコード', '文字入りQR', '登録不要', 
                'デザインQR', 'QRコード生成', '高画質', 'オリジナルQR'
            ]
        };

        const container = document.getElementById('tagContainer');
        container.innerHTML = ''; // Clear existing
        
        const currentTags = tags[currentLang] || tags['en'];
        
        currentTags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-500 hover:border-indigo-300 transition-colors cursor-default';
            span.textContent = tag;
            container.appendChild(span);
        });
    }

    // Initial call to set default language
    updateLanguage();

    // Default generation
    generateQRCode();

    // Fetch Visitor Count
    fetchVisitorCount();

    generateBtn.addEventListener('click', generateQRCode);
    
    // Add real-time update listeners for better UX
    qrContentInput.addEventListener('input', debounce(generateQRCode, 500));
    fillTextInput.addEventListener('input', debounce(generateQRCode, 300));
    fontScaleInput.addEventListener('input', generateQRCode);
    fontWeightInput.addEventListener('change', generateQRCode);
    qrColorInput.addEventListener('input', (e) => {
        colorValueDisplay.textContent = e.target.value.toUpperCase();
        debounce(generateQRCode, 100)();
    });
    
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

    // Corner Style Listeners
    cornerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            cornerBtns.forEach(b => {
                b.classList.remove('border-indigo-500', 'bg-indigo-50');
                b.classList.add('border-gray-200', 'bg-white');
                b.querySelector('div').classList.remove('border-indigo-600', 'bg-indigo-600');
                b.querySelector('div').classList.add('border-gray-400');
                if(b.dataset.style === 'square') b.querySelector('div').classList.remove('bg-indigo-600'); 
            });
            btn.classList.remove('border-gray-200', 'bg-white');
            btn.classList.add('border-indigo-500', 'bg-indigo-50');
            
            const div = btn.querySelector('div');
            div.classList.remove('border-gray-400');
            div.classList.add('border-indigo-600');
            if(btn.dataset.style === 'square') div.classList.add('bg-indigo-600');

            cornerStyleInput.value = btn.dataset.style;
            generateQRCode();
        });
    });

    // Frame Style Listeners
    frameBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            frameBtns.forEach(b => {
                b.classList.remove('border-indigo-500', 'bg-indigo-50');
                b.classList.add('border-gray-200', 'bg-white');
            });
            btn.classList.remove('border-gray-200', 'bg-white');
            btn.classList.add('border-indigo-500', 'bg-indigo-50');

            const style = btn.dataset.style;
            frameStyleInput.value = style;

            // Show/Hide Frame Text Input
            if (style === 'none') {
                frameTextGroup.classList.add('hidden');
            } else {
                frameTextGroup.classList.remove('hidden');
            }

            generateQRCode();
        });
    });

    frameTextInput.addEventListener('input', debounce(generateQRCode, 300));
    
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
        const color = qrColorInput.value;
        
        // Styles
        const cornerStyle = cornerStyleInput.value;
        const frameStyle = frameStyleInput.value;
        const frameText = frameTextInput.value.trim();

        // Manual Labels (Only used if frameStyle is none)
        const labelTop = labelTopInput.value.trim();
        const labelBottom = labelBottomInput.value.trim();
        const labelLeft = labelLeftInput.value.trim();
        const labelRight = labelRightInput.value.trim();
        const hasManualLabels = (labelTop || labelBottom || labelLeft || labelRight) && frameStyle === 'none';

        try {
            // Use Type 0 (Auto), Error Correction Level H (High) - best for custom QRs
            const qr = qrcode(0, 'H');
            qr.addData(content);
            qr.make();

            const moduleCount = qr.getModuleCount();
            
            // Base configuration
            const baseSize = 1000;
            let totalSize = baseSize;
            let offsetX = 0;
            let offsetY = 0;
            
            // Frame / Margin Calculations
            if (frameStyle === 'none') {
                const labelMargin = hasManualLabels ? 150 : 0;
                totalSize = baseSize + (labelMargin * 2);
                offsetX = labelMargin;
                offsetY = labelMargin;
            } else if (frameStyle === 'simple') {
                const padding = 100;
                totalSize = baseSize + (padding * 2);
                offsetX = padding;
                offsetY = padding;
            } else if (frameStyle === 'polaroid') {
                const padding = 80;
                const bottomPadding = 300;
                // For polaroid, we will adjust canvas dimensions directly below
                totalSize = baseSize + (padding * 2); 
                offsetX = padding;
                offsetY = padding;
            }

            // Canvas Sizing
            if (frameStyle === 'polaroid') {
                const padding = 80;
                const bottomPadding = 300;
                canvas.width = baseSize + (padding * 2);
                canvas.height = baseSize + padding + bottomPadding;
            } else {
                canvas.width = totalSize;
                canvas.height = totalSize;
            }

            // CSS Display Size
            canvas.style.width = '400px';
            canvas.style.height = 'auto'; // Maintain aspect ratio

            const ctxWidth = canvas.width;
            const ctxHeight = canvas.height;

            const cellSize = baseSize / moduleCount;

            // Clear canvas
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, ctxWidth, ctxHeight);

            // Draw Frame Backgrounds/Borders
            if (frameStyle === 'simple') {
                ctx.lineWidth = 20;
                ctx.strokeStyle = '#000000';
                ctx.strokeRect(20, 20, ctxWidth - 40, ctxHeight - 40);
            } else if (frameStyle === 'polaroid') {
                // Polaroid background is already white (cleared)
                // Border
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#E5E7EB'; // Gray-200
                ctx.strokeRect(1, 1, ctxWidth - 2, ctxHeight - 2);
                
                // Inner image border (around QR)
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#F3F4F6'; // Gray-100
                ctx.strokeRect(offsetX - 10, offsetY - 10, baseSize + 20, baseSize + 20);
            }

            // Helper to identify Finder Patterns
            const isFinderPattern = (r, c) => {
                const TOP_LEFT = r < 7 && c < 7;
                const TOP_RIGHT = r < 7 && c >= moduleCount - 7;
                const BOTTOM_LEFT = r >= moduleCount - 7 && c < 7;
                return TOP_LEFT || TOP_RIGHT || BOTTOM_LEFT;
            };

            // Draw QR Modules (Text)
            ctx.save();
            ctx.translate(offsetX, offsetY);

            ctx.fillStyle = color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const fontSize = cellSize * scale;
            ctx.font = `${fontWeight} ${fontSize}px 'Kanit', sans-serif`;

            for (let r = 0; r < moduleCount; r++) {
                for (let c = 0; c < moduleCount; c++) {
                    if (qr.isDark(r, c)) {
                        // Skip Finder Patterns if we are styling them custom
                        if (isFinderPattern(r, c)) {
                            continue; 
                        }

                        const x = (c * cellSize) + (cellSize / 2);
                        const y = (r * cellSize) + (cellSize / 2);
                        
                        // Draw Text
                        ctx.fillText(fillText, x, y);
                        // Optional: Add stroke for weight
                        if (fontWeight === 'bold' || fontWeight === '900') {
                            ctx.lineWidth = fontSize * 0.05;
                            ctx.strokeStyle = color;
                            ctx.strokeText(fillText, x, y);
                        }
                    }
                }
            }
            
            // Draw Custom Finder Patterns
            drawFinderPatterns(ctx, moduleCount, cellSize, cornerStyle, color);

            ctx.restore();

            // Draw Frame Text / Manual Labels
            if (frameStyle === 'none' && hasManualLabels) {
                drawManualLabels(ctx, ctxWidth, color);
            } else if (frameStyle !== 'none' && frameText) {
                ctx.fillStyle = '#000000'; // Always black or maybe match QR color? Let's use black for frame text usually
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                if (frameStyle === 'simple') {
                    ctx.font = `bold 60px 'Kanit', sans-serif`;
                    // Text at bottom margin area (padding is 100)
                    ctx.fillText(frameText, ctxWidth / 2, ctxHeight - 50);
                } else if (frameStyle === 'polaroid') {
                    ctx.font = `bold 80px 'Kanit', sans-serif`;
                    // Text centered in the bottom padding area (300px high)
                    const bottomAreaStart = ctxHeight - 300;
                    ctx.fillText(frameText, ctxWidth / 2, bottomAreaStart + 150);
                }
            }

            // Draw Logo
            if (logoImage) {
                const logoSize = baseSize * 0.22; // 22% of QR size
                // Calculate logo position relative to QR area
                const lx = offsetX + (baseSize - logoSize) / 2;
                const ly = offsetY + (baseSize - logoSize) / 2;
                
                // White background for logo
                ctx.fillStyle = '#FFFFFF';
                const padding = 10;
                ctx.fillRect(lx - padding, ly - padding, logoSize + (padding * 2), logoSize + (padding * 2));

                ctx.drawImage(logoImage, lx, ly, logoSize, logoSize);
            }
            
            downloadBtn.classList.remove('hidden');

        } catch (e) {
            console.error(e);
            alert('Error generating QR Code. Please try shorter text.');
        }
    }

    function drawFinderPatterns(ctx, moduleCount, cellSize, style, color) {
        ctx.fillStyle = color;
        const patternSize = 7 * cellSize;
        
        // Positions relative to QR area (0,0)
        const pos = [
            { r: 0, c: 0 }, // Top Left
            { r: 0, c: moduleCount - 7 }, // Top Right
            { r: moduleCount - 7, c: 0 } // Bottom Left
        ];

        pos.forEach(p => {
            const x = p.c * cellSize;
            const y = p.r * cellSize;

            if (style === 'square') {
                // Outer Box
                ctx.fillRect(x, y, patternSize, patternSize);
                // Inner White
                ctx.clearRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
                // Inner Box
                ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
            } else if (style === 'rounded') {
                // Outer Rounded
                roundRect(ctx, x, y, patternSize, patternSize, 2 * cellSize);
                ctx.fill();
                // Inner White (Clear)
                ctx.save();
                ctx.globalCompositeOperation = 'destination-out';
                roundRect(ctx, x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize, 1.5 * cellSize);
                ctx.fill();
                ctx.restore();
                // Inner Rounded
                roundRect(ctx, x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize, cellSize);
                ctx.fill();
            } else if (style === 'circle') {
                // Outer Circle
                ctx.beginPath();
                ctx.arc(x + patternSize/2, y + patternSize/2, patternSize/2, 0, Math.PI * 2);
                ctx.fill();
                // Inner White
                ctx.save();
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(x + patternSize/2, y + patternSize/2, (5 * cellSize)/2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                // Inner Circle
                ctx.beginPath();
                ctx.arc(x + patternSize/2, y + patternSize/2, (3 * cellSize)/2, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }

    function roundRect(ctx, x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    function drawManualLabels(ctx, totalSize, color) {
        const labelTop = document.getElementById('labelTop').value.trim();
        const labelBottom = document.getElementById('labelBottom').value.trim();
        const labelLeft = document.getElementById('labelLeft').value.trim();
        const labelRight = document.getElementById('labelRight').value.trim();
        const labelMargin = 150;

        ctx.fillStyle = color;
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

    // Visitor Counter Logic
    function fetchVisitorCount() {
        const counterElement = document.getElementById('visitorCount');
        // Use a fixed domain key to ensure count persists across local dev and production
        // and to avoid 'localhost' pollution if desired.
        const domainKey = 'i-qr-text-web.stepbasiicz'; 

        fetch('https://visitor.6developer.com/visit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                domain: domainKey,
                // Optional: Send path to track specific pages, but for total site visits, simple is fine.
                // page_path: window.location.pathname 
            })
        })
        .then(res => res.json())
        .then(data => {
            // Animate the number counting up
            animateValue(counterElement, 0, data.totalCount, 1000);
        })
        .catch(err => {
            console.error('Error fetching visitor count:', err);
            counterElement.innerText = '-';
        });
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
