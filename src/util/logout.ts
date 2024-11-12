export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_info");
  window.location.reload();
}
