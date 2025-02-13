$(document).ready(function() {
    // Fetch the JSON file with regions and districts
    $.getJSON('data/regions_districts.json', function(data) {
        // Populate the Region dropdown with data from the JSON file
        data.regions.forEach(function(region) {
            $('#region').append(new Option(region.name, region.id));
        });

        // Update the District dropdown when a Region is selected
        $('#region').change(function() {
            var selectedRegionId = $(this).val();

            // Clear the District dropdown before loading new data
            $('#district').empty();
            $('#district').append(new Option('Select District', ''));

            // Find the selected region in the data and load its districts
            if (selectedRegionId) {
                var selectedRegion = data.regions.find(function(region) {
                    return region.id == selectedRegionId;
                });

                // Populate the District dropdown with the districts for the selected region
                selectedRegion.districts.forEach(function(district) {
                    $('#district').append(new Option(district, district));
                });
            }
        });
    }).fail(function() {
        console.error("Error loading regions and districts data.");
    });

    // Form validation
    $('#registration-form').submit(function(event) {
        event.preventDefault(); // Prevent form submission to validate

        // Full Name validation
        var fullName = $('#full_name').val().trim();
        if (!fullName.match(/^[A-Za-z\s]+$/)) {
            alert('Please enter a valid full name.');
            return false;
        }

        // Registration Number validation (BCS-00-0000-0000)
        var registrationNumber = $('#registration_number').val().trim();
        if (!registrationNumber.match(/^BCS-\d{2}-\d{4}-\d{4}$/)) {
            alert('Please enter a valid registration number (format: BCS-00-0000-0000).');
            return false;
        }

        // Gender validation (must select an option)
        var gender = $('#gender').val();
        if (!gender) {
            alert('Please select your gender.');
            return false;
        }

        // Email validation
        var email = $('#email').val().trim();
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!email.match(emailRegex)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Region and District validation
        var region = $('#region').val();
        var district = $('#district').val();
        if (!region || !district) {
            alert('Please select both region and district.');
            return false;
        }

        // Password validation
        var password = $('#password').val().trim();
        var confirmPassword = $('#confirm_password').val().trim();
        var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!password.match(passwordRegex)) {
            alert('Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.');
            return false;
        }

        // Password confirmation
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return false;
        }

        // If all validations pass, submit the form
        alert('Registration successful!');
        // You can add an AJAX request here to submit the form data to the server
    });
});
