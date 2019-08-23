const FollowToggle = require("./follow-toggle");
const UserSearch = require("./users_search");

$(() => {
  let $followButton = $(".follow-toggle");
  let $toggleFollow = new FollowToggle($followButton);
  let $searchNav = $(".user-search");
  
  let $userSearch = new UserSearch($searchNav);
});