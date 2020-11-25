/*
    KEYBOARD MANAGEMENT
*/

document.addEventListener('keydown', manageKeyDowns);
document.addEventListener('keyup', manageKeyUps);

function manageKeyDowns(e) {
    switch (screenState) {
        case 1:
            if (e.code === 'Space') {
                showScreen(2);
            }
            break;
        case 2:
            if (e.code === 'Space') {
                torpedos.fireShipTorpedo();
            }
            if (e.code === 'ArrowLeft') {
                // ship.manageShip(-1);
                shipDirection = -1;
            }
            if (e.code === 'ArrowRight') {
                // ship.manageShip(1);
                shipDirection = 1;
            }
            break;
    }
}

function manageKeyUps(e) {
    switch (screenState) {
        case 1:
            break;
        case 2:
            if (e.code === 'ArrowLeft') {
                shipDirection = 0;
            }
            if (e.code === 'ArrowRight') {
                shipDirection = 0;
            }
            break;
    }
}