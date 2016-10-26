<?php
	
	class CodeHL {
		
		private static 
			$weight = 400,
			$color;			
		
		public static function color(string $color) {
			static::$color = $color;
		}
		
		public static function weight(int $weight) {
			static::$weight = (new ReflectionFunction(
				function() use ($weight) { 
					switch ($weight) {
						case 1: return 200; break;
						case 2: return 400; break;
						case 3: return 600; break;
						case 4: return 800; break;
					} 
				}
			))->invoke();
		}
		
		public function code(string $code, string $hl = null) {
			$snippet = str_replace("<", "&lt;", $code);
			
			if (!is_null($hl)) {
				$args = func_get_args($hl);
				foreach ($args as $ea) {
					$snippet = str_replace($ea, $this->high($ea), $snippet);
				}
			}
				
			echo "<div id='code'>"
					. "<pre><code>" . $snippet . "</code></pre>"
				. "</div>";
		}
		
		private function high(string $hl) {
			return ( 
				preg_replace('/>\s+</', "><",
					"<span style='font-weight:".static::$weight."; color:".static::$color.";'>" 
						.$hl. 
					"</span>"
				)
			);
		}
	} 
	
?>