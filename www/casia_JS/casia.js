

/* Boutons appel et mail pour changer d'image */
var appel_diaporama = document.getElementById('appel_diaporama');
var mail_diaporama = document.getElementById('mail_diaporama');

appel_diaporama.addEventListener('mouseover', appel_img_rouge);
appel_diaporama.addEventListener('mouseout', appel_img_blanche);

mail_diaporama.addEventListener('mouseover', mail_img_blue);
mail_diaporama.addEventListener('mouseout', mail_img_blanche);




var appel_prets_a_partir = document.getElementById('appel_prets_a_partir');
var mail_prets_a_partir = document.getElementById('mail_prets_a_partir');

appel_prets_a_partir.addEventListener('mouseover', appel_img_rouge);
appel_prets_a_partir.addEventListener('mouseout', appel_img_blanche);

mail_prets_a_partir.addEventListener('mouseover', mail_img_blue);
mail_prets_a_partir.addEventListener('mouseout', mail_img_blanche);


function appel_img_rouge() {
	document.getElementById('appel_diaporama').innerHTML = '<img src="../casia_images/appel-red.svg"> +32 475 29 75 06';
	appel_diaporama.style.transitionDuration = '.2s';
	appel_diaporama.style.transitionProperty = 'all';
	appel_diaporama.style.transitionTimingFunction = 'ease-in';

	document.getElementById('appel_prets_a_partir').innerHTML = '<img src="../casia_images/appel-red.svg"> +32 475 29 75 06';
	appel_prets_a_partir.style.transitionDuration = '.2s';
	appel_prets_a_partir.style.transitionProperty = 'all';
	appel_prets_a_partir.style.transitionTimingFunction = 'ease-in';
}

function appel_img_blanche() {
	document.getElementById('appel_diaporama').innerHTML = '<img src="../casia_images/tel.svg"> +32 475 29 75 06';
	appel_diaporama.style.transitionDuration = '.2s';
	appel_diaporama.style.transitionProperty = 'all';
	appel_diaporama.style.transitionTimingFunction = 'ease-in';

	document.getElementById('appel_prets_a_partir').innerHTML = '<img src="../casia_images/tel.svg"> +32 475 29 75 06';
	appel_prets_a_partir.style.transitionDuration = '.2s';
	appel_prets_a_partir.style.transitionProperty = 'all';
	appel_prets_a_partir.style.transitionTimingFunction = 'ease-in';
}

function mail_img_blue() {
	document.getElementById('mail_diaporama').innerHTML = '<img src="../casia_images/mail-blue.svg"> e-mail';
	mail_diaporama.style.transitionDuration = '.2s';
	mail_diaporama.style.transitionProperty = 'all';
	mail_diaporama.style.transitionTimingFunction = 'ease-in';

	document.getElementById('mail_prets_a_partir').innerHTML = '<img src="../casia_images/mail-blue.svg"> e-mail';
	mail_prets_a_partir.style.transitionDuration = '.2s';
	mail_prets_a_partir.style.transitionProperty = 'all';
	mail_prets_a_partir.style.transitionTimingFunction = 'ease-in';
}

function mail_img_blanche() {
	document.getElementById('mail_diaporama').innerHTML = '<img src="../casia_images/mail.svg"> e-mail';
	mail_diaporama.style.transitionDuration = '.2s';
	mail_diaporama.style.transitionProperty = 'all';
	mail_diaporama.style.transitionTimingFunction = 'ease-in';

	document.getElementById('mail_prets_a_partir').innerHTML = '<img src="../casia_images/mail.svg"> e-mail';
	mail_prets_a_partir.style.transitionDuration = '.2s';
	mail_prets_a_partir.style.transitionProperty = 'all';
	mail_prets_a_partir.style.transitionTimingFunction = 'ease-in';
}
/* Boutons appel et mail pour changer d'image */





/* 2. Diaporama (Le code pour le texte qui change) */
jQuery(document).ready(function($){
	//set animation timing
	var animationDelay = 5000,
		//loading bar effect
		barAnimationDelay = 3800,
		selectionDuration = 500,
		revealAnimationDelay = 1500;
	
	initHeadline();
	

	function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($('.cd-headline.letters').find('b'));
		//initialise headline animation
		animateHeadline($('.cd-headline'));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word = $(this),
				letters = word.text().split(''),
				selected = word.hasClass('is-visible');
			for (i in letters) {
				if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);
			
			if(headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
			} else if (headline.hasClass('clip')){
				var spanWrapper = headline.find('.cd-words-wrapper'),
					newWidth = spanWrapper.width() + 10
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type') ) {
				//assign to .cd-words-wrapper the width of its longest word
				var words = headline.find('.cd-words-wrapper b'),
					width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
				    if (wordWidth > width) width = wordWidth;
				});
				headline.find('.cd-words-wrapper').css('width', width);
			};

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);
		
		if($word.parents('.cd-headline').hasClass('type')) {
			var parentSpan = $word.parent('.cd-words-wrapper');
			parentSpan.addClass('selected').removeClass('waiting');	
			setTimeout(function(){ 
				parentSpan.removeClass('selected'); 
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
		
		} else if($word.parents('.cd-headline').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

		}  else if($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.cd-headline').hasClass('loading-bar')){
			$word.parents('.cd-words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

		} else {
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}
});
/* 2. Diaporama (Le code pour le texte qui change) */



/*  4. Plomberie professionnelle  */
var $cog = $('#img_cle'),
    $body = $(document.body),
    bodyHeight = $body.height();

$(window).scroll(function () {
    $cog.css({
        'transform': 'rotate(' + ($body.scrollTop() / bodyHeight * 195) + 'deg)'
    });
});
/*  4. Plomberie professionnelle  */














var radio1 = document.querySelector('#radio1');
var radio2 = document.querySelector('#radio2');
var radio3 = document.querySelector('#radio3');
var radio4 = document.querySelector('#radio4');
var tableau = document.querySelector('#nos_engagements');
var check1 = document.querySelector('#check1');
var check2 = document.querySelector('#check2');
var check3 = document.querySelector('#check3');
var check4 = document.querySelector('#check4');
var checkbox1 = document.querySelector("#checkbox1");
var checkbox2 = document.querySelector("#checkbox2");
var checkbox3 = document.querySelector("#checkbox3");
var checkbox4 = document.querySelector("#checkbox4");

var title1 = "Déplacement et devis gratuits";
var title2 = "Services 24/7";
var title3 = "Prix abordables";
var title4 = "Equipe certifiée et experimentée";

var texte1 = "Casia se déplace dans tout Bruxelles et ses environs pout tout probleme de chauffage, plomberie ou débouchage. Devis gratuit.";
var texte2 = "Pour répondre à l'urgence, Casia est disponible pour vous aider 24/7. Un tarif de nuit est appliqué après 20:00.";
var texte3 = "Vous saurez toujours à l'avance ce que les travaux vous coûteront, que ce soit pour une urgence ou pour une installation neuve. Jamais de mauvaises surprises!";
var texte4 = "Spécialisée dans la plomberie, chauffage et débouchage, Casia a aujourd'hui 17 ans d'expérience dans le confort de votre foyer.";



/*
radio1.addEventListener('mouseover', Message1);
radio2.addEventListener('mouseover', Message2);
radio3.addEventListener('mouseover', Message3);
radio4.addEventListener('mouseover', Message4);


function Message1() {
	radio1.style.backgroundColor = '#c9cfd6';
	radio2.style.backgroundColor = '#f7f4f2';
	radio3.style.backgroundColor = '#f7f4f2';
	radio4.style.backgroundColor = '#f7f4f2';
	radio1.style.fontFamily = 'BondarOffice-Bold, sans-serif';
	radio2.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio3.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio4.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio1.style.transition = 'all .2s ease-in-out';
	document.getElementById('deplacement').innerHTML = title1;
	document.querySelector('.laissez').innerHTML = texte1;
}
function Message2() {
	radio1.style.backgroundColor = '#f7f4f2';
	radio2.style.backgroundColor = '#c9cfd6';
	radio3.style.backgroundColor = '#f7f4f2';
	radio4.style.backgroundColor = '#f7f4f2';
	radio1.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio2.style.fontFamily = 'BondarOffice-Bold, sans-serif';
	radio3.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio4.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio2.style.transition = 'all .2s ease-in-out';
	document.getElementById('deplacement').innerHTML = title2;
	document.querySelector('.laissez').innerHTML = texte2;
}
function Message3() {
	radio1.style.backgroundColor = '#f7f4f2';
	radio2.style.backgroundColor = '#f7f4f2';
	radio3.style.backgroundColor = '#c9cfd6';
	radio4.style.backgroundColor = '#f7f4f2';
	radio1.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio2.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio3.style.fontFamily = 'BondarOffice-Bold, sans-serif';
	radio4.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio3.style.transition = 'all .2s ease-in-out';
	document.getElementById('deplacement').innerHTML = title3;
	document.querySelector('.laissez').innerHTML = texte3;
}
function Message4() {
	radio1.style.backgroundColor = '#f7f4f2';
	radio2.style.backgroundColor = '#f7f4f2';
	radio3.style.backgroundColor = '#f7f4f2';
	radio4.style.backgroundColor = '#c9cfd6';
	radio1.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio2.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio3.style.fontFamily = 'BondarOffice-Regular, sans-serif';
	radio4.style.fontFamily = 'BondarOffice-Bold, sans-serif';
	radio4.style.transition = 'all .2s ease-in-out';
	document.getElementById('deplacement').innerHTML = title4;
	document.querySelector('.laissez').innerHTML = texte4;
}
*/



/* 6. Nos engagements:  */
function textechangeant() {

	var x = 1;

	while(x == 1){
		var a = setTimeout(function() {
			radio4.style.backgroundColor = '#f7f4f2';
			radio1.style.backgroundColor = '#c9cfd6';
			radio4.style.fontFamily = 'BondarOffice-Regular, sansFamily';
			radio1.style.fontFamily = 'BondarOffice-Bold, sans-serif';
			radio1.style.transition = 'all .2s ease-in-out';
			document.getElementById('deplacement').innerHTML = title1;
			document.querySelector('.laissez').innerHTML = texte1;
			check1.style.display = 'flex';
			check4.style.display = 'none';
			checkbox1.style.display = 'none';
			checkbox2.style.display = 'flex';
			checkbox3.style.display = 'flex';
			checkbox4.style.display = 'flex';
		},0);

		x++;
	}

	while(x == 2){
		var b = setTimeout(function() {
			radio1.style.backgroundColor = '#f7f4f2';
			radio2.style.backgroundColor = '#c9cfd6';
			radio1.style.fontFamily = 'BondarOffice-Regular, sans-serif';
			radio2.style.fontFamily = 'BondarOffice-Bold, sans-serif';
			radio2.style.transition = 'all .2s ease-in-out';
			document.getElementById('deplacement').innerHTML = title2;
			document.querySelector('.laissez').innerHTML = texte2;
			check2.style.display = 'flex';
			check1.style.display = 'none';
			checkbox2.style.display = 'none';
			checkbox1.style.display = 'flex';
		},7000);

		x++;
	}

	while(x == 3){
		var c = setTimeout(function() {
			radio2.style.backgroundColor = '#f7f4f2';
			radio3.style.backgroundColor = '#c9cfd6';
			radio2.style.fontFamily = 'BondarOffice-Regular, sans-serif';
			radio3.style.fontFamily = 'BondarOffice-Bold, sans-serif';
			radio3.style.transition = 'all .2s ease-in-out';
			document.getElementById('deplacement').innerHTML = title3;
			document.querySelector('.laissez').innerHTML = texte3;
			check3.style.display = 'flex';
			check2.style.display = 'none';
			checkbox3.style.display = 'none';
			checkbox2.style.display = 'flex';
		},14000);

		x++;
	}

	while(x == 4){
		var d = setTimeout(function() {
			radio3.style.backgroundColor = '#f7f4f2';
			radio4.style.backgroundColor = '#c9cfd6';
			radio3.style.fontFamily = 'BondarOffice-Regular, sans-serif';
			radio4.style.fontFamily = 'BondarOffice-Bold, sans-serif';
			radio4.style.transition = 'all .2s ease-in-out';
			document.getElementById('deplacement').innerHTML = title4;
			document.querySelector('.laissez').innerHTML = texte4;
			check4.style.display = 'flex';
			check3.style.display = 'none';
			checkbox4.style.display = 'none';
			checkbox3.style.display = 'flex';
		},21000);

		x++;
	}

	setTimeout(textechangeant, 28000);

}

textechangeant();
/* 6. Nos engagements:  */



/* 8. Nous sommes prêts à partir (Le code pour l'heure en direct) */
var currentDate = new Date();
var heure = document.getElementById('temps');
var tempsReel = setInterval(horloge);

function horloge(){
	var d = new Date();
	var h = d.getHours();
	var min = d.getMinutes();

	if(h < 10) {h = "0" + h}

	if(min < 10) {min = "0" + min}

	heure.innerHTML = h + ":" + min;
}
/* 8. Nous sommes prêts à partir (Le code pour l'heure en direct) */






/*  11. Essay  */
/*  11. Essay  */
















