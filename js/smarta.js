jQuery(document).ready(function () {
    'use strict';

    var scanMoment = "";
    var scanMomentEN = "";
    var theFile;
    var thebase = '';
    var theType = '';
    var payloadBot = {};

    var redoIt = function () {
        $('.errordiv').addClass('hidden');
        $("#alertDiv").addClass("fadedOut");
        $('.thebodyofdoc').addClass('hidden');
        $('.theparentclass').removeClass('hidden');
        thebase = '';
    };

    $('.redotid').on("click", function () {
        redoIt();
    });
    var api_url = "https://bot.hr4youlive.com/nodered/smarta";
    var submitDocument = function (param) {
        $.ajax({
            type: "POST",
            url: api_url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: param,
            contentType: "application/json",
            beforeSend: function () {
                $("#alertDiv").toggleClass("fadedOut");
                $('.inputcheck').val('');
                disabledrops();
                scanMoment = "";
                scanMomentEN = "";
                var minutes = moment().format('mm');
                var therestdate = moment().format('DD/MM/YYYY HH');
                var therestdate2 = moment().format('MM/DD/YYYY HH');
                scanMoment = therestdate + 'h' + minutes;
                scanMomentEN = therestdate2 + ':' + minutes;
            },
            success: function (data) {
                enabledrops();
                $("#alertDiv").toggleClass("fadedOut");
                if (data.status === 'error' || !checkType(data)) {
                    $('.errordiv').removeClass('hidden');
                } else {

                    broadcastInfo(data);

                    $('.theparentclass').addClass('hidden');
                    $('.thebodyofdoc').removeClass('hidden');
                    $('.responsiveimg').attr('src', thebase);

                }
            },
            error: function (data) {
                enabledrops();
                console.log("error");
                $('.errordiv').removeClass('hidden');
                $("#alertDiv").toggleClass("fadedOut");
            }
        });
    };
    var disabledrops = function () {
        $('#files-upload').addClass('disabled');
    };
    var enabledrops = function () {
        $('#files-upload').removeClass('disabled');
    };
    var checkType = function (doc) {
        theType = doc.type;
        payloadBot = {};
        switch (doc.type) {

            case "rib":
                return true;

                break;
            case "arret":
                return true;

                break;
            case "mariage":
                return true;

                break;
                /*           case "quittance":
                       return true;
   
                       break;
                   case "naissance":
                       return true;
   
                       break;
                   case "domicile":
                       return true;
                     break;
                       */

            default:
                return false;
                break;
        }
    };
    var getDocType = function (docType) {

        $('.inputcheck').removeClass('neededinput');
        $('b').removeClass('neededinputb');
        switch (docType.type) {
            case "cni":
                manageCni(docType);

                break;
            case "rib":
                manageRib(docType);

                break;
            case "arret":
                manageArret(docType);

                break;
            case "domicile":
                manageDomicile(docType);

                break;
            case "mariage":
                manageMariage(docType);

                break;
            case "quittance":
                manageQuittance(docType);

                break;
            case "naissance":
                manageNaissance(docType);

                break;
            default:
                manageElse(docType);
                break;
        }

    };
    var getUsernameFullname = function () {
        var aValue = localStorage.getItem("hrlab-username");
        switch (aValue) {
            case "rperez":
                return "Ronaldo Perez";

                break;
            case "nrenaud":
                return "Katie Simon";

                break;
            case "mldupond":
                return "Laura Duncan";

                break;
            case "egarcin":
                return "Emma Garcin";

                break;

            default:
                return "Ronaldo Perez";
                break;
        }
    };

    var manageNaissance = function (x) {
        $('.infogroups').addClass('hidden');

    };
    var manageQuittance = function (x) {
        $('.infogroups').addClass('hidden');

    };
    var manageDomicile = function (x) {
        $('.infogroups').addClass('hidden');


    };
    var manageElse = function (x) {
        $('.infogroups').addClass('hidden');

    };
    var manageCni = function (x) {
        $('.infogroups').addClass('hidden');

    };
    $('.inputcheck').change(function () {
        var theId;
        if ($(this).val().length === 0) {
            $(this).addClass('neededinput');
            theId = $(this).attr('id');
            $('.' + theId).addClass('neededinputb');
        } else {
            $(this).removeClass('neededinput');
            theId = $(this).attr('id');
            $('.' + theId).removeClass('neededinputb');
        }
    });
    var colorTheLib = function (state, theElem) {
        if (state) {
            $('.' + theElem).addClass('neededinputb');
            $('#' + theElem).addClass('neededinput');
        } else {
            $('.' + theElem).removeClass('neededinputb');
            $('#' + theElem).removeClass('neededinput');
        }
    };
    var manageRib = function (doc) {
        $('.infogroups').addClass('hidden');
        $('.informationhead').removeClass('hidden');
        $('#ibanid').removeClass('hidden');
        /**
         * *need to be replaced with a proper code 
         * A.H
         */

        var thebodyof = "";
        if (localStorage.getItem('lng') == "fr") {
            thebodyof += '<span>Les données de cet';
            thebodyof += "&nbsp;";
            thebodyof += '<b class="rgpdtype" >';
            thebodyof += "relevé d'identité bancaire</b>";
            thebodyof += "&nbsp;";
            thebodyof += 'vont être utilisées pour:</span> <br />';
            thebodyof += '   <span class="listofrgpd"> - La mise à jour de votre dossier dans le SIRH</span> <br />';
            thebodyof += '        <span class="listofrgpd">- Le virement de la paie</span> <br />';
            thebodyof += '        <span class="listofrgpd">-  Le stockage dans le dossier numérique</span> <br />';
            thebodyof += '       <div class="footerrgpd">Document importé le  ' + scanMoment + ' par ' + getUsernameFullname() + '</div>';

        } else {
            thebodyof += '<span>The datas from this<b class="rgpdtype" > RIB </b>(Bank details) are going to be used :';
            thebodyof += '  <br />  <span class="listofrgpd"> - update your personal data information in the HR system</span> <br />';
            thebodyof += '        <span class="listofrgpd">- the bank transfer of your salary</span> <br />';
            thebodyof += '        <span class="listofrgpd">- the attach file will be uploaded on the electronic document management system</span> <br />';
            thebodyof += '       <div class="footerrgpd">Import document :   ' + scanMomentEN + ' by ' + getUsernameFullname() + '</div>';

            $('.imgrgpd').attr("src", "/resources-hrlab/icons/gpdr.png");
        }

        $('.bodyofmodal').html(thebodyof);




        if (doc.iban) {
            colorTheLib(false, "ib");
            var iban = doc.iban.replace(' ', '');
            payloadBot.iban = iban;
            $('#ib').val(iban);
        } else {
            colorTheLib(true, "ib");
        }
        if (doc.bic) {
            colorTheLib(false, "bi");
            var bic = doc.bic.replace(' ', '');
            payloadBot.bic = bic;
            $('#bi').val(bic);
        } else {
            colorTheLib(true, "bi");
        }
        if (doc.name) {
            colorTheLib(false, "ic");
            $('#ic').val(doc.name);
        } else {
            colorTheLib(true, "ic");
        }
    };
    var manageArret = function (doc) {
        $('.infogroups').addClass('hidden');
        $('.informationhead').removeClass('hidden');
        $('#idcontrat').removeClass('hidden');
        colorTheLib(false, "checkbox1");
        colorTheLib(false, "checkbox2");
        var parts = doc.name.split(' ');
        if (parts[0]) {
            colorTheLib(false, "nomcont");
            $('#nomcont').val(parts[0]);
        } else {
            colorTheLib(true, "nomcont");
        }
        if (parts[1]) {
            colorTheLib(false, "prenomcont");
            $('#prenomcont').val(parts[1]);
        } else {
            colorTheLib(true, "prenomcont");
        }
        if (doc.nummatriculation) {
            colorTheLib(false, "numsec");
            payloadBot.num_secu = doc.nummatriculation;
            $('#numsec').val(doc.nummatriculation);
        } else {
            colorTheLib(true, "numsec");
        }
        if (doc.initial) {
            $('#checkbox2').prop('checked', false);
            $('#checkbox1').prop('checked', true);
            payloadBot.type_arret = "initial";
        } else {
            if (doc.prolongation) {
                $('#checkbox1').prop('checked', false);
                $('#checkbox2').prop('checked', true);
                payloadBot.type_arret = "prolongation";
            } else {
                $('#checkbox1').prop('checked', false);
                $('#checkbox2').prop('checked', false);
                colorTheLib(true, "checkbox1");
                colorTheLib(true, "checkbox2");
                payloadBot.type_arret = "";
            }

        }
        /**
         * *need to be replaced with a proper code 
         * A.H
         */
        var thebodyof = "";
        thebodyof += '<span>Les données de cet';
        thebodyof += "&nbsp;";
        thebodyof += '<b class="rgpdtype" >arrêt de travail</b>';
        thebodyof += "&nbsp;";
        thebodyof += 'vont être utilisées pour:</span> <br />';
        thebodyof += '   <span class="listofrgpd"> - Le Calcul de la paie</span> <br />';
        thebodyof += '        <span class="listofrgpd">- La Déclaration des données sociales</span> <br />';
        thebodyof += '        <span class="listofrgpd">- Le stockage dans le dossier numérique</span> <br />';
        thebodyof += '       <div class="footerrgpd">Document importé le  ' + scanMoment + ' par ' + getUsernameFullname() + '</div>';
        $('.bodyofmodal').html(thebodyof);

        if (doc.datedebut) {
            var deb = moment(doc.datedebut, "DD MM YYYY").format('YYYY-MM-DD');
            if (deb === "Invalid date") {
                colorTheLib(false, "datedeb");
            } else {
                payloadBot.start_date = deb;
                $('#datedeb').val(deb);
            }
        } else {
            colorTheLib(false, "datedeb");
        }
        if (doc.datefin) {
            var fin = moment(doc.datefin, "DD MM YYYY").format('YYYY-MM-DD');
            if (fin === "Invalid date") {
                colorTheLib(false, "datefin");
            } else {
                payloadBot.end_date = fin;
                $('#datefin').val(fin);
            }
        } else {
            colorTheLib(false, "datefin");
        }
    };
    $('.sev_check').change(function (e) {
        e.preventDefault();
        colorTheLib(false, "checkbox1");
        colorTheLib(false, "checkbox2");
        $('.sev_check').not(this).prop('checked', false);
        $(this).prop('checked', true);

    });
    var manageMariage = function (doc) {
        $('.infogroups').addClass('hidden');
        $('.accordion').removeClass('hidden');
        $('.informationhead').removeClass('hidden');
        /**
         * *need to be replaced with a proper code 
         * A.H
         */
        var thebodyof = "";
        thebodyof += '<span>Les données de cet';
        thebodyof += "&nbsp;";
        thebodyof += '<b class="rgpdtype" >certificat de mariage</b>';
        thebodyof += "&nbsp;";
        thebodyof += 'vont être utilisées pour:</span> <br />';
        thebodyof += '   <span class="listofrgpd"> - La mise à jour de votre dossier dans le SIRH</span> <br />';
        thebodyof += '        <span class="listofrgpd">- Le calcul de la paie</span> <br />';
        thebodyof += '        <span class="listofrgpd">- Les échanges avec la mutuelle</span> <br />';
        thebodyof += '        <span class="listofrgpd">- Le stockage dans le dossier numérique</span> <br />';
        thebodyof += '       <div class="footerrgpd">Document importé le ' + scanMoment + ' par ' + getUsernameFullname() + '</div>';
        $('.bodyofmodal').html(thebodyof);
        var partsOfStr = doc.name;
        var prenom = '';
        if (partsOfStr[0]) {
            prenom = '';
            var parts = partsOfStr[0].split('  ');
            for (var i = 0; i < parts.length; i++) {
                if (i === parts.length - 1) {
                    $('#nomone').val(parts[i]);
                    payloadBot.person1_lastname = parts[i];
                } else {
                    prenom += parts[i] + ' ';
                    if (i === parts.length - 2) {
                        $('#prenomone').val(prenom);
                        payloadBot.person1_firstname = parts[i];
                    }


                }
            }


        }
        if (partsOfStr[1]) {
            prenom = '';

            var parts = partsOfStr[1].split('  ');
            for (var i = 0; i < parts.length; i++) {
                if (i === parts.length - 1) {
                    $('#nomtwo').val(parts[i]);
                    payloadBot.person2_lastname = parts[i];
                } else {
                    prenom += ' ' + parts[i];
                    if (i === parts.length - 2) {
                        $('#prenomtwo').val(prenom);
                        payloadBot.person2_firstname = prenom;
                    }

                }
            }
        }

        var now = moment(doc.date).format('YYYY-MM-DD');
        payloadBot.date = now;
        $('#date').val(now);

    };

    var broadcastInfo = function (data) {
        var displayedResponse = data.type;
        if (localStorage.lng == "en") {
            switch (data.type) {
                case "mariage":
                    displayedResponse = "marriage certificate";
                    break;
                case "rib":
                    displayedResponse = "bank account details";
                    break;
                case "arret":
                    displayedResponse = "work stopping";
                    break;
                case "ndf":
                    displayedResponse = "expense report";
                    break;
                case "cv":
                    displayedResponse = "curriculum vitae";
                    break;
                case "autre":
                    displayedResponse = data.type;
                    break;
            }
        } else {
            switch (data.type) {
                case "mariage":
                    displayedResponse = "certificat de mariage";
                    break;
                case "rib":
                    displayedResponse = "relevé d'identité bancaire";
                    break;
                case "arret":
                    displayedResponse = "arrêt de travail";
                    break;
                case "ndf":
                    displayedResponse = "note de frais";
                    break;
                case "cv":
                    displayedResponse = "curriculum vitae";
                    break;
                case "autre":
                    displayedResponse = data.type;
                    break;
            }
        }

        $("#filetype").html(displayedResponse);
        $('.inputcheck').removeClass('neededinput');
        $('b').removeClass('neededinputb');
        getDocType(data);
    };
    var getBase64 = function (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {

        };
        reader.onloadend = function () {
            return setvariabs(reader.result);

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

    };
    var setvariabs = function (rslt) {
        thebase = '';
        thebase = rslt;
        var based = thebase;
        based = based.replace('data:image/jpeg;base64,', '');
        submitDocument({
            image: based
        });
    };

    function processLaFile(oEvent) {
        var oFile = oEvent.target.files[0];
        getBase64(oFile);
    }
    var oFileIn;

    oFileIn = document.getElementById('my_file_input');
    if (oFileIn.addEventListener) {
        oFileIn.addEventListener('change', processLaFile, false);
    }
      $("#files-upload").on('click', function(oEvent) {
          $('#my_file_input').trigger('click');
      });
      $('.search-file-btn').children("input").bind('change', function() {
        var fileName = '';
        fileName = $(this).val().split("\\").slice(-1)[0];
        $(this).parent().next("span").html(fileName);
      })
   
      
    $('#sendbtn').on('click', function () {

        var payload = {};

        switch (theType) {
            case "rib":
                payload.iban = $('#ib').val();
                payload.bic = $('#bi').val();

                window.iban = $('#ib').val();
                window.bic = $('#bi').val();
                window.accountname = $('#ic').val();
                if (window.ikbotSnippet && window.ikbotSnippet.context) {
                    window.ikbotSnippet.context.push('iban');
                    window.ikbotSnippet.context.push('bic');
                    window.ikbotSnippet.context.push('accountname');
                }
                break;
            case "arret":
                payload.start_date = $('#datedeb').val();
                payload.end_date = $('#datefin').val();
                payload.type_arret = $('input[name=type_arret]:checked', '#idcontrat').val();
                payload.num_secu = $('#numsec').val();
                break;
            case "mariage":
                payload.date = $('#date').val();
                payload.person1_firstname = $('#prenomone').val();
                payload.person1_lastname = $('#nomone').val();
                payload.person2_firstname = $('#prenomtwo').val();
                payload.person2_lastname = $('#nomtwo').val();
                break;
            default:
                return false;
        }
        $.ajax({
            type: "POST",
            url: "https://bot.hr4youlive.com/nodered/smarta/submit",
            data: {
                user: localStorage.getItem('hrlab-username'),
                image: thebase.replace('data:image/jpeg;base64,', ''),
                type: theType,
                source: "smarta",
                botData: payloadBot,
                userData: payload
            },
            beforeSend: function () {},
            success: function (data) {
                redoIt();
                $('#thisModal').modal('toggle');
            },
            error: function (data) {
                console.log("error with the bot activity");
                redoIt();
                $('#thisModal').modal('toggle');
            }
        });


    });
});