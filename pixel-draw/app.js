const palette = [
    'red',
    'blue',
    'green',
    'purple',
    'yellow',
]

function makePalette() {
    for (let i = 0; i < palette.length; i++) {
    
        const nextColor = palette[i];
        let button = $('<button>').css('background-color', nextColor);
        $('.palette').append(button);
    
      }
      $('.palette button').first().addClass('active');
}

makePalette();

$('.gridSize button').click(function() {
    const rows = $('#gridIdWidth').val();
    const cols = $('#gridIdHeight').val();
    makeGrid(rows, cols);
  });


function makeGrid(rows = 8, cols = 8) {
    const cellCount = rows * cols;
    const gridElement = $('.grid').html('').css({
        height: 64 * rows + 2,
        width: 64 * cols + 2,
    });

    for(let i = 0; i < cellCount; i++){
        let cells = $('<div class="cell"></div>');
        $('.grid').append(cells);
        }
}

makeGrid();

function onPaletteClick() {
    $('.palette .active').removeClass('active');
    $(this).addClass('active');
}

$('.palette button').click(onPaletteClick);

// I moved this into the mouse down function below.
// function onGridClick() {
//     let selectedColor = $('.palette .active').css('background-color');
//     let cell = $(this).css('background-color');
//     if(cell === selectedColor) {
//         $(this).css('background-color', '');
//     } else {
//         $(this).css('background-color', selectedColor);
//     }
   
// }

// $('.grid .cell').click(onGridClick);

function onClearClick() {
    $('.grid .cell').css('background-color', '');
}

$('.controls .clear').click(onClearClick);

function onFillAllClick() {
    let selectedColor = $('.palette .active').css('background-color');
    $('.grid .cell').css('background-color', selectedColor);
}

$('.controls .fill-all').click(onFillAllClick);

function onFillEmptyClick() {
    let element = $('.cell');
    let selectedColor = $('.palette .active').css('background-color');
    for(let i = 0; i < element.length; i++) {
        let nextElement = element[i];
        if($(nextElement).css('background-color') === 'rgba(0, 0, 0, 0)') {
            $(nextElement).css('background-color', selectedColor);
        }
    }

}

$('.controls .fill-empty').click(onFillEmptyClick);

function addNewColor() {
    let colorInput = document.getElementById('colorId').value;
    let newColorButton = $('<button>').css('background-color', colorInput ).click(onPaletteClick);

    $('.palette').prepend(newColorButton);

    $('.palette .active').removeClass('active');
    $('.palette button').first().addClass('active');

    
}
    
$('.addColor button').click(addNewColor);

let mouseIsDown = false;


$('.grid').on('mousedown', '.cell', function(){
    mouseIsDown = true;
    let cell = $(this).css('background-color');
    let selectedColor = $('.palette .active').css('background-color');
    if(cell === selectedColor) {
        $(this).css('background-color', '');
    } else {
        $(this).css('background-color', selectedColor);
    }
});

$('.grid').on('mouseenter', '.cell', function(){
    if(mouseIsDown === true) {
    let selectedColor = $('.palette .active').css('background-color');
    $(this).css('background-color', selectedColor);
    } 
});

$('.grid').on('mouseup', '.cell', function(){
    mouseIsDown = false;
});










