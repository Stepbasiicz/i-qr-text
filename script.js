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
    const canvas = document.getElementById('qrCanvas');
    const ctx = canvas.getContext('2d');
    const langBtns = document.querySelectorAll('.lang-btn');

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
            popularTagsTitle: 'Popular Searches'
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
            popularTagsTitle: 'คำค้นหายอดฮิต'
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
            popularTagsTitle: '热门搜索'
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
            popularTagsTitle: '人気の検索'
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

            // Offset context for QR drawing
            ctx.save();
            ctx.translate(labelMargin, labelMargin);

            // Configure Text
            ctx.fillStyle = color;
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
                            ctx.fillStyle = color; // Ensure finder patterns match selected color
                            ctx.fillRect(x, y, cellSize + 0.5, cellSize + 0.5); 
                        } else {
                            // Draw text for data modules
                            const centerX = x + (cellSize / 2);
                            const centerY = y + (cellSize / 2);
                            
                            // Make text act more like a block:
                            // 1. Draw text
                            ctx.fillStyle = color; // Ensure text matches selected color
                            ctx.fillText(fillText, centerX, centerY);
                            
                            // 2. Add stroke to make it "fatter" (improves scanning density)
                            ctx.lineWidth = fontSize * 0.05; // 5% stroke
                            ctx.strokeStyle = color;
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
