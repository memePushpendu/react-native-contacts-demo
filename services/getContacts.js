import simpleContacts from 'react-native-simple-contacts';


function fetchContacts() {
    // get contacts
    return new Promise(function (resolve, reject) {
        simpleContacts.getContacts().then((contacts) => {
            let responseContacts = JSON.parse(contacts)
                .sort(function (a, b) {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                })

            resolve(filterDuplicateNumber(responseContacts.map((item) => {
                item.match = true;
                item.number = modifyNumber(item.number);
                return item
            })));
        });
    });
}

function modifyNumber(number) {
    let currentNumber = number.split(" ");
    (currentNumber).forEach(element => {
        element = element.trim();
    });
    currentNumber = currentNumber.join("").substr(-10);
    return currentNumber;
}

function filterDuplicateNumber(numberArray = []) {
    return numberArray.filter((element, index) => {
        let phoneNumber = element.number;
        let thisIndex = numberArray.findIndex(item => item.number === phoneNumber);
        if (index == thisIndex) {
            return element;
        }
    });
}

export default fetchContacts;