require( 'components' ).create( 'navigation', {
	initialize: function ( ) {
		window.addEventListener( 'scroll', this.scrolled.bind( this ) );
		window.addEventListener( 'resize', this.calculatePositions.bind( this ) );

		this.$el.find( '.nav-open' ).on( 'click', this.menuToggle.bind( this ) )
		this.$el.find( 'a' ).on( 'click', this.menuClose.bind( this ) )

		this.calculatePositions();
	},

	calculatePositions: function ( ) {
		if ( this.navFixed ) {
			this.$el.removeClass( '-fixed' );
			this.navFixed = false;
		}

		this.small = Rye( '.nav-open', this.el ).css( 'display' ) != 'none';
		this.navTop = this.el.getBoundingClientRect().top + document.body.scrollTop;
		this.navHeight = this.el.offsetHeight;

		this.scrolled();
	},

	scrolled: function ( ) {
		if ( !this.small ) {
			if ( document.body.scrollTop > this.navTop && !this.navFixed ) {
				this.$el.addClass( '-fixed' );
				this.navFixed = true;
			}
			else if ( document.body.scrollTop <= this.navTop && this.navFixed ) {
				this.$el.removeClass( '-fixed' );
				this.navFixed = false;
			}
		}
	},

	menuToggle: function ( event ) {
		event.preventDefault();
		event.stopPropagation();
		this.$el.find( '.nav-menu' ).toggleClass( '-opened' );
	},

	menuClose: function ( event ) {
		if ( this.small ) {
			this.$el.find( '.nav-menu' ).removeClass( '-opened' );
		}
	}
} );