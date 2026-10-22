<?php
session_start();
session_unset();
session_destroy();
echo "<script>
    localStorage.removeItem('explorar_user');
    window.location.href = '../html/login.html';
</script>";
?>
