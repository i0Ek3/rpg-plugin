// 常量定义
const SPEC_STR = "!@#$%&*";
const CHOICE_MIX = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CHOICE_DIG = "0123456789";
const CHOICE_LET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const RANDOM_INT = Math.floor(Math.random() * (12 - 10 + 1)) + 10;

// 生成指定长度的由字母+数字+特殊字符组成的密码
function genpwd(length) {
    let password = CHOICE_MIX.charAt(Math.floor(Math.random() * CHOICE_MIX.length));

    const characters = CHOICE_MIX + SPEC_STR;
    for (let i = 1; i < length - 1; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    password += CHOICE_MIX.charAt(Math.floor(Math.random() * CHOICE_MIX.length));

    return insertSpecialCharacter(password, SPEC_STR);
}

// 如果生成的密码中不存在特殊字符，则随机插入一个特殊字符到密码中
function insertSpecialCharacter(oriStr, specialCharacters) {
    let hasSpecialCharacter = false;

    for (let char of specialCharacters) {
        if (oriStr.includes(char)) {
            hasSpecialCharacter = true;
            break;
        }
    }

    if (!hasSpecialCharacter) {
        let index = Math.floor(Math.random() * (oriStr.length - 2)) + 1;
        let previousChar = oriStr[index - 1];
        let nextChar = oriStr[index];

        while (specialCharacters.includes(previousChar) || specialCharacters.includes(nextChar)) {
            index = Math.floor(Math.random() * (oriStr.length - 2)) + 1;
            previousChar = oriStr[index - 1];
            nextChar = oriStr[index];
        }

        const charToInsert = specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
        oriStr = oriStr.slice(0, index) + charToInsert + oriStr.slice(index);
    }

    const indices = [];
    for (let i = 1; i < oriStr.length - 1; i++) {
        if (specialCharacters.includes(oriStr[i])) {
            indices.push(i);
        }
    }

    if (indices.length > 1) {
        const indexToRemove = indices[Math.floor(Math.random() * (indices.length - 1))];
        oriStr = oriStr.slice(0, indexToRemove) + oriStr.slice(indexToRemove + 1);
    }

    return oriStr;
}

// 移除末尾的连接符-
function removeTrailingHyphen(password) {
    if (password.endsWith("-")) {
        return password.slice(0, -1);
    }
    return password;
}

// 根据 choice 生成指定长度的密码
function genpwdBy(choice) {
    let password = "";
    for (let i = 0; i < 3; i++) {
        let segment = "";
        for (let j = 0; j < 4; j++) {
            segment += choice.charAt(Math.floor(Math.random() * choice.length));
        }
        password += segment;
    }
    return removeTrailingHyphen(password);
}

// 事件监听
document.getElementById('generate').addEventListener('click', function() {
    const passwordListElement = document.getElementById('passwordList');
    passwordListElement.innerHTML = '';

    const pwda = genpwd(RANDOM_INT);
    const pwdb = genpwdBy(CHOICE_MIX);
    const pwdc = genpwdBy(CHOICE_DIG);
    const pwdd = genpwdBy(CHOICE_LET);

    const passwords = [pwda, pwdb, pwdc, pwdd];
    passwords.forEach(password => {
        const li = document.createElement('li');
        li.textContent = password;
        passwordListElement.appendChild(li);
    });
});
