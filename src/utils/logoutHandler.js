import swal from "sweetalert";

const logoutHandler = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("userId")
  localStorage.removeItem("user")
  swal({
    title: "Sukses!",
    text: `Logout Sukses`,
    icon: "success",
    button: "Ok",
  }).then((result) => {
        window.location.href = `/home`;
  });
}

export default logoutHandler