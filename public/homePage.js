'use strict'

const logoutButton = new LogoutButton()
const ratesBoard = new RatesBoard()
const moneyManager = new MoneyManager()
const favoritesWidget = new FavoritesWidget()

logoutButton.action = function() {
    ApiConnector.logout(res => {
        if(res.success) location.reload()
    })
}

ApiConnector.current(res => {
    if(res.success) {
        ProfileWidget.showProfile(res.data)
    }
})

ratesBoard.getCurrentExRate = function(params) {
    ApiConnector.getStocks(res => {
        if(res.success) {
            ratesBoard.clearTable()
            ratesBoard.fillTable(res.data)
        }
    })
}

ratesBoard.getCurrentExRate()
setInterval(ratesBoard.getCurrentExRate, 60000)

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, res => {
        if(res.success) {
            ProfileWidget.showProfile(res.data)
            moneyManager.setMessage(true, 'Успех')
            return
        }
        moneyManager.setMessage(false, res.error)
    })
}

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, res => {
        if(res.success) {
            ProfileWidget.showProfile(res.data)
            moneyManager.setMessage(true, 'Успех')
            return
        }
        moneyManager.setMessage(false, res.error)
    })
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, res => {
        if(res.success) {
            ProfileWidget.showProfile(res.data)
            moneyManager.setMessage(true, 'Успех')
            return
        }
        moneyManager.setMessage(false, res.error)
    })
}

ApiConnector.getFavorites(res => {
    if(res.success) {
        favoritesWidget.clearTable()
        favoritesWidget.fillTable(res.data)
        favoritesWidget.updateUsersList(res.data)
    }
})

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, res => {
        if(res.success) {
            favoritesWidget.clearTable()
            favoritesWidget.fillTable(res.data)
            favoritesWidget.updateUsersList(res.data)
            return
        }
        favoritesWidget.setMessage(false, res.error)
    })
}

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, res => {
        if(res.success) {
            favoritesWidget.clearTable()
            favoritesWidget.fillTable(res.data)
            return
        }
        favoritesWidget.setMessage(false, res.error)
    })
}