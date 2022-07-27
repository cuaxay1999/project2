const moneyFormatter = (money) => {
    if (Boolean(parseInt(money))) {
        return new Intl.NumberFormat('vn-VN').format(money);
    }
    return money;
};

export { moneyFormatter };
