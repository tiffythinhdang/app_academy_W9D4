const APIUtil = {
  follow: (id) => {
    return $.ajax({
      method: "POST",
      url: `/users/${id}/follow/`,
      dataType: "JSON"
    });
  },

  unfollow: (id) => {
    return $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow/`,
      dataType: "JSON"
    });
  },

  searchUser: (query) => {
    return $.ajax({
      method: "GET",
      url: "/users/search/",
      dataType: "JSON",
      data: {query}
    });
  }
};

module.exports = APIUtil;