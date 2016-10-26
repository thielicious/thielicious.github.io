<?php 

	class Dynamizer {
		
		public 
			$sect;
			
		private 
			$buffer,
			$home = "sects/home.htm";
			
		const ERR = "[!]Error: ";
		
		function __construct($get = null) {
			if ($get) {
				$php = strpos($get,".php", 0);
				if ($php || !$php) {
					$this->sect = $get;
					$this->buffer();
				} else {
					echo ERR.__LINE__."->get";
				} 
			}
		}
		
		private function buffer() {
			ob_start();
			include $this->sect;
			$output = ob_get_clean();
			if ($output) {
				$this->buffer = $output;				
			} else {
				echo ERR.__LINE__."->buffer()";
			}
		}
		
		public function modify($old, $new) {
			if ($this->buffer != null) {
				$this->buffer = str_replace($old, $new, $this->buffer);
			} else {
				echo ERR.__LINE__."->modify()";
			}
		}
		
		public function showSection() {
			if ($this->buffer != null) {
				echo $this->buffer;
			} else {
				echo ERR.__LINE__."->showSection().";
			}
		}

		public function showContent() {
			if (!empty($_GET["goto"])) {
				$action = "sects/".$_GET["goto"].".htm";
				$cont = new Dynamizer($action);
				$cont->showSection();
			} else {
				$default = new Dynamizer($this->home);
				$default->showSection();
			}
		}
	}
	
?>