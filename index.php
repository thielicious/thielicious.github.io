<?php 
	include "scr/classes/dynamizer.class.php"; 
	
	$meta = new Dynamizer("meta.php");
	$header = new Dynamizer("header.php");
	$sidebar = new Dynamizer("sidebar.php");
	$content = new Dynamizer("content.php");
	$footer = new Dynamizer("footer.php");
?>
<!DOCTYPE html>
<html>
	<?php $meta->showSection(); ?>
	<body>
		<header>
			<?php $header->showSection(); ?>
		</header>
		<main> 
			<?php 
				$sidebar->showSection();
				$content->showSection(); 
			?>
		</main>
		<footer>
			<?php $footer->showSection(); ?>
		</footer>
	</body>
</html>