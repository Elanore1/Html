const url = "http://localhost:8081/MavenProject/contact";
$(document).ready(function() {


    // get with ajax example
     $('#accounts').click(function (e) {
        $('#accounts_table tr').remove();
        e.preventDefault();
        $.ajax({
            url: url,
            type: 'GET',

            crossOrigin: true,
            success: function(data){
                let value = JSON.stringify(data);
                var trHTML = '';
                $.each(data, function (i, item) {
                    trHTML += '<tr><td>' + item.name + '</td><td>' + item.email + '</td><td>' + item.password + '</td><td>' + item.age +'</td><td>' + item.gender +'</td><td>' + item.job +'</td><td>' + item.comment + '</td></tr>';
                });
                $('#accounts_table').append(trHTML);
                $('#accounts_table').show();
            },
            error: function (data) {
                console.log(data);
            }
        });
    });

    // fetch example http GET ::

//$('#lectures').click(function (e) {
//$('#lectures_table tr').remove();
//       e.preventDefault();
//       fetch(url).
//       then(response => response.json())
//       .then(data => {
//       		 var trHTML = '';
//                $.each(data, function (i, item) {
//                    trHTML += '<tr><td>' + item.id + '</td><td>' + item.subject + '</td><td>' + item.author + '</td><td>' + item.preface + '</td></tr>';
//                });
//                $('#lectures_table').append(trHTML);
//                $('#lectures_table').show();
//       })
//});


    //post with fetch example
    $("#addAccountForm").submit(function(event) {
        event.preventDefault();
        request = {
            name : $('#name').val(),
            email : $('#email').val(),
            password : $('#password').val(),
            age : $('#age').val(),
            gender : $('#gender').val(),
            job : $('#job').val(),
            comment : $('#comment').val(),
        }
        fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(request)})
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                var trHTML = '';

                trHTML += '<tr><td>' + data.name + '</td><td>' + data.email + '</td><td>' + data.password + '</td><td>' + data.age +'</td><td>' + data.gender +'</td><td>' + data.job +'</td><td>' + data.comment + '</td></tr>';
                $('#accounts_table').append(trHTML);

            })
            .catch((error) => {
                window.alert(error);
            });


    });


    function handleErrors(response) {
        if (!response.ok) {
            throw new Error('Something went wrong: ' + response.status);
        }
        return response;
    }

    $('#addAccount').click(function (e) {
        e.preventDefault();
        const form = document.getElementById('addAccountForm');

        if (form.style.display === 'none') {
            // 👇️ this SHOWS the lectureForm
            form.style.display = 'block';
        } else {
            // 👇️ this HIDES the form
            form.style.display = 'none';
        }
    });
});

