import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				flavors: {
					vanilla: 'hsl(var(--vanilla))',
					strawberry: 'hsl(var(--strawberry))',
					chocolate: 'hsl(var(--chocolate))',
					pineapple: 'hsl(var(--pineapple))',
					banana: 'hsl(var(--banana))',
					mango: 'hsl(var(--mango))'
				},
				// 🍭 Candy-Inspired Brand Colors
				candy: {
					peach: {
						50: '#fef7f0',
						100: '#fdeee0',
						200: '#fad4b0',
						300: '#f7ba80',
						400: '#f4a050',
						500: '#f18620',
						600: '#e16a00',
						700: '#b85400',
						800: '#8f3e00',
						900: '#662800',
					},
					mint: {
						50: '#f0fdf9',
						100: '#e0fbf3',
						200: '#bef5e7',
						300: '#9cefdb',
						400: '#7ae9cf',
						500: '#58e3c3',
						600: '#36ddb7',
						700: '#14d7ab',
						800: '#10b08a',
						900: '#0c8969',
					},
					cocoa: {
						50: '#faf8f7',
						100: '#f5f1ef',
						200: '#ebe3df',
						300: '#e1d5cf',
						400: '#d7c7bf',
						500: '#cdb9af',
						600: '#c3ab9f',
						700: '#b99d8f',
						800: '#947e72',
						900: '#6f5f55',
					},
					sky: {
						50: '#f0f9ff',
						100: '#e0f2fe',
						200: '#bae6fd',
						300: '#94d9fc',
						400: '#6ecdfa',
						500: '#48c0f9',
						600: '#22b4f7',
						700: '#0ea5e9',
						800: '#0284c7',
						900: '#0369a1',
					},
					banana: {
						50: '#fffbeb',
						100: '#fef3c7',
						200: '#fde68a',
						300: '#fcd34d',
						400: '#fbbf24',
						500: '#f59e0b',
						600: '#d97706',
						700: '#b45309',
						800: '#92400e',
						900: '#78350f',
					},
					berry: {
						50: '#fdf2f8',
						100: '#fce7f3',
						200: '#fbcfe8',
						300: '#f9a8d4',
						400: '#f472b6',
						500: '#ec4899',
						600: '#db2777',
						700: '#be185d',
						800: '#9d174d',
						900: '#831843',
					},
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-soft': 'var(--gradient-soft)',
				'gradient-flavor': 'var(--gradient-flavor)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-hero': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--secondary)) 100%)',
				'gradient-viral': 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
				'gradient-pastel': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
				'gradient-sunset': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'gradient-forest': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
				'gradient-cherry': 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
				'gradient-mint': 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
				'gradient-vanilla': 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
				'gradient-chocolate': 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
				'gradient-mango': 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
				'gradient-pineapple': 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
				'gradient-banana': 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
				'gradient-blueberry': 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
				'gradient-coconut': 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
				'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
				// 🍭 Candy Gradients
				'candy-peach': 'linear-gradient(135deg, #fdeee0 0%, #f4a050 50%, #e16a00 100%)',
				'candy-mint': 'linear-gradient(135deg, #e0fbf3 0%, #58e3c3 50%, #14d7ab 100%)',
				'candy-cocoa': 'linear-gradient(135deg, #f5f1ef 0%, #cdb9af 50%, #947e72 100%)',
				'candy-sky': 'linear-gradient(135deg, #e0f2fe 0%, #48c0f9 50%, #0ea5e9 100%)',
				'candy-banana': 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 50%, #d97706 100%)',
				'candy-berry': 'linear-gradient(135deg, #fce7f3 0%, #ec4899 50%, #be185d 100%)',
				'candy-swirl': 'conic-gradient(from 0deg, #fdeee0, #e0fbf3, #e0f2fe, #fef3c7, #fce7f3, #f5f1ef)',
				'candy-rainbow': 'linear-gradient(45deg, #fdeee0 0%, #e0fbf3 16%, #e0f2fe 32%, #fef3c7 48%, #fce7f3 64%, #f5f1ef 80%, #fdeee0 100%)',
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'glow': 'var(--shadow-glow)',
				'inner-glow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
				'floating': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'viral': '0 20px 40px -12px rgba(255, 107, 107, 0.3)',
				'pastel': '0 10px 30px -10px rgba(255, 154, 158, 0.5)',
				'neon': '0 0 20px rgba(255, 255, 255, 0.5)',
				'rainbow': '0 0 30px rgba(255, 107, 107, 0.3), 0 0 60px rgba(78, 205, 196, 0.2), 0 0 90px rgba(69, 183, 209, 0.1)',
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'bounce': 'var(--transition-bounce)',
				'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'xl': 'calc(var(--radius) + 4px)',
				'2xl': 'calc(var(--radius) + 8px)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'pulse-slow': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.5'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200px 0'
					},
					'100%': {
						backgroundPosition: 'calc(200px + 100%) 0'
					}
				},
				'heartbeat': {
					'0%, 100%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.1)'
					}
				},
				'wiggle': {
					'0%, 100%': {
						transform: 'rotate(0deg)'
					},
					'25%': {
						transform: 'rotate(5deg)'
					},
					'75%': {
						transform: 'rotate(-5deg)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'rotate-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'glow': {
					'0%': {
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
					},
					'100%': {
						boxShadow: '0 0 30px hsl(var(--primary) / 0.6)'
					}
				},
				'viral-pulse': {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: '0 0 20px rgba(255, 107, 107, 0.3)'
					},
					'50%': {
						transform: 'scale(1.05)',
						boxShadow: '0 0 40px rgba(255, 107, 107, 0.6)'
					}
				},
				'rainbow-shift': {
					'0%': {
						filter: 'hue-rotate(0deg)'
					},
					'100%': {
						filter: 'hue-rotate(360deg)'
					}
				},
				'text-shimmer': {
					'0%': {
						backgroundPosition: '-200% center'
					},
					'100%': {
						backgroundPosition: '200% center'
					}
				},
				'confetti': {
					'0%': {
						transform: 'translateY(0) rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(100vh) rotate(720deg)',
						opacity: '0'
					}
				},
				'typing': {
					'0%, 100%': {
						borderColor: 'transparent'
					},
					'50%': {
						borderColor: 'hsl(var(--primary))'
					}
				},
				'wave': {
					'0%, 100%': {
						transform: 'rotate(0deg)'
					},
					'25%': {
						transform: 'rotate(20deg)'
					},
					'75%': {
						transform: 'rotate(-20deg)'
					}
				},
				// 🍭 Candy Animations
				'candy-bounce': {
					'0%, 100%': {
						transform: 'translateY(0) scale(1)',
						filter: 'hue-rotate(0deg)'
					},
					'50%': {
						transform: 'translateY(-15px) scale(1.05)',
						filter: 'hue-rotate(180deg)'
					}
				},
				'candy-swirl': {
					'0%': {
						transform: 'rotate(0deg) scale(1)',
						filter: 'hue-rotate(0deg)'
					},
					'50%': {
						transform: 'rotate(180deg) scale(1.1)',
						filter: 'hue-rotate(180deg)'
					},
					'100%': {
						transform: 'rotate(360deg) scale(1)',
						filter: 'hue-rotate(360deg)'
					}
				},
				'candy-melt': {
					'0%': {
						transform: 'scale(1) skewX(0deg)',
						borderRadius: '50%'
					},
					'50%': {
						transform: 'scale(1.2) skewX(5deg)',
						borderRadius: '30%'
					},
					'100%': {
						transform: 'scale(1) skewX(0deg)',
						borderRadius: '50%'
					}
				},
				'flavor-pop': {
					'0%': {
						transform: 'scale(1)',
						boxShadow: '0 0 0 rgba(255, 255, 255, 0)'
					},
					'50%': {
						transform: 'scale(1.15)',
						boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
					},
					'100%': {
						transform: 'scale(1)',
						boxShadow: '0 0 0 rgba(255, 255, 255, 0)'
					}
				},
				'bubble-float': {
					'0%': {
						transform: 'translateY(100vh) scale(0)',
						opacity: '0'
					},
					'10%': {
						opacity: '1'
					},
					'90%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(-100vh) scale(1)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.6s ease-out',
				'scale-in': 'scaleIn 0.5s ease-out',
				'bounce-gentle': 'bounceGentle 2s infinite',
				'pulse-slow': 'pulseSlow 3s infinite',
				'float': 'float 6s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'slide-up': 'slideUp 0.5s ease-out',
				'slide-down': 'slideDown 0.5s ease-out',
				'rotate-slow': 'rotateSlow 10s linear infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'viral-pulse': 'viral-pulse 2s ease-in-out infinite',
				'rainbow-shift': 'rainbow-shift 3s linear infinite',
				'text-shimmer': 'text-shimmer 2s linear infinite',
				'confetti': 'confetti 3s ease-out forwards',
				'typing': 'typing 1s ease-in-out infinite',
				'wave': 'wave 1s ease-in-out infinite',
				// 🍭 Candy Animations
				'candy-bounce': 'candy-bounce 2s ease-in-out infinite',
				'candy-swirl': 'candy-swirl 4s linear infinite',
				'candy-melt': 'candy-melt 3s ease-in-out infinite',
				'flavor-pop': 'flavor-pop 0.6s ease-out',
				'bubble-float': 'bubble-float 8s linear infinite',
			},
			backdropBlur: {
				'xs': '2px',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			fontSize: {
				'2xs': ['0.625rem', { lineHeight: '0.75rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }],
			},
			screens: {
				'xs': '475px',
				'3xl': '1600px',
				'4xl': '1920px',
			},
			zIndex: {
				'60': '60',
				'70': '70',
				'80': '80',
				'90': '90',
				'100': '100',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
