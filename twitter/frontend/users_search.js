const APIUtil = require('./api_util')

class UserSearch {
  constructor($nav) {
    this.$nav = $nav;
    this.$input = $nav.find("input");
    this.$ul = $nav.find("ul");
    this.handleInput();
  }

  handleInput() {
    this.$input.on("input", (e) => {
      let that = this;
    
      let res = APIUtil.searchUser(that.$input.val());
      // debugger;
      res.then(res => {
      debugger;
      window.alert('works');
      console.log(res);
    }, () => {
      // window.alert('does not work');
    });
  });
  }  
}

module.exports = UserSearch;