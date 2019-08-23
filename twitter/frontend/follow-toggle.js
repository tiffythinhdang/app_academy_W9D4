const APIUtil = require("./api_util");

class FollowToggle {
  constructor ($button) {
    this.userId = $button.data("user-id");
    this.followState = $button.data("initial-follow-state");
    this.$button = $button;
    this.render();
    this.$button.on("click", this.handleClick.bind(this));
  }

  render() {
    if (this.followState === "unfollowed") {
      this.$button.text("Follow!");
    } else {
      this.$button.text("Unfollow!");
    }
  }

  handleClick(e) {
    e.preventDefault();

    if (this.followState === "unfollowed") {
      APIUtil.follow(this.userId)
      .then( res => {
        let but = e.currentTarget;
        $(but).data("initial-follow-state", "followed");
        this.followState = "followed";
        return this.render();
      });

    } else {
      APIUtil.unfollow(this.userId).then(res => {
        let but = e.currentTarget;
        $(but).data("initial-follow-state", "unfollowed");
        this.followState = "unfollowed";
        return this.render();
      });
    }
  }
}

module.exports = FollowToggle;