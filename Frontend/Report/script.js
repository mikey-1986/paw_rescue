
        // DOM Elements
        const photoUpload = document.getElementById('photoUpload');
        const photoInput = document.getElementById('photoInput');
        const removePhoto = document.getElementById('removePhoto');
        const contactToggle = document.getElementById('contactToggle');
        const toggleSwitch = document.getElementById('toggleSwitch');
        const contactFields = document.getElementById('contactFields');
        const form = document.getElementById('strayDogForm');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');

        let uploadedPhoto = null;

        // Photo upload functionality
        photoUpload.addEventListener('click', () => {
            if (!uploadedPhoto) {
                photoInput.click();
            }
        });

        photoInput.addEventListener('change', handlePhotoSelect);

        function handlePhotoSelect(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    displayPhoto(e.target.result);
                    uploadedPhoto = file;
                };
                reader.readAsDataURL(file);
            }
        }

        function displayPhoto(imageSrc) {
            photoUpload.innerHTML = `
                <img src="${imageSrc}" alt="Uploaded photo" class="photo-preview">
                <button type="button" class="remove-photo" id="removePhoto">&times;</button>
            `;
            
            // Re-attach event listener to new remove button
            document.getElementById('removePhoto').addEventListener('click', (e) => {
                e.stopPropagation();
                removePhotoHandler();
            });
        }

        function removePhotoHandler() {
            uploadedPhoto = null;
            photoInput.value = '';
            photoUpload.innerHTML = `
                <svg class="photo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21,15 16,10 5,21"/>
                </svg>
                <div class="photo-text">
                    <div>Click to upload photo</div>
                    <div style="font-size: 14px; margin-top: 5px; opacity: 0.7;">or drag and drop</div>
                </div>
            `;
        }

        // Drag and drop functionality
        photoUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!uploadedPhoto) {
                photoUpload.classList.add('drag-over');
            }
        });

        photoUpload.addEventListener('dragleave', () => {
            photoUpload.classList.remove('drag-over');
        });

        photoUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            photoUpload.classList.remove('drag-over');
            
            if (!uploadedPhoto) {
                const files = e.dataTransfer.files;
                if (files.length > 0 && files[0].type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        displayPhoto(e.target.result);
                        uploadedPhoto = files[0];
                    };
                    reader.readAsDataURL(files[0]);
                }
            }
        });

        // Contact info toggle
        contactToggle.addEventListener('click', () => {
            toggleSwitch.classList.toggle('active');
            contactFields.classList.toggle('show');
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            // Collect form data
            const formData = {
                description: document.getElementById('description').value,
                photo: uploadedPhoto ? uploadedPhoto.name : null,
                includeContact: toggleSwitch.classList.contains('active'),
                contactInfo: toggleSwitch.classList.contains('active') ? {
                    name: document.getElementById('contactName').value,
                    phone: document.getElementById('contactPhone').value,
                    email: document.getElementById('contactEmail').value
                } : null,
                timestamp: new Date().toISOString()
            };
            
            // Simulate API call
            setTimeout(() => {
                console.log('Stray dog report submitted:', formData);
                
                // Show success message
                successMessage.style.display = 'block';
                
                // Reset form
                form.reset();
                removePhotoHandler();
                toggleSwitch.classList.remove('active');
                contactFields.classList.remove('show');
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Report';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
            }, 1500);
        });

        // Form validation
        const description = document.getElementById('description');
        description.addEventListener('input', () => {
            if (description.value.trim().length < 10) {
                description.setCustomValidity('Please provide a more detailed description (at least 10 characters)');
            } else {
                description.setCustomValidity('');
            }
        });
    