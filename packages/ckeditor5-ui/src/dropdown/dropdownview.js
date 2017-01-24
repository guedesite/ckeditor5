/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module ui/dropdown/dropdownview
 */

import View from '../view';
import Template from '../template';

/**
 * The dropdown view class.
 *
 * @extends module:ui/view~View
 */
export default class DropdownView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale, buttonView, panelView ) {
		super( locale );

		// Extend button's template before it's registered as a child of the dropdown because
		// by doing so, its #element is rendered and any post–render template extension will
		// not be reflected in DOM.
		Template.extend( buttonView.template, {
			attributes: {
				class: [
					'ck-dropdown__button'
				]
			}
		} );

		/**
		 * Button of this dropdown view.
		 *
		 * @readonly
		 * @member {ui.button.ButtonView} #buttonView
		 */
		this.buttonView = buttonView;

		/**
		 * Panel of this dropdown view.
		 *
		 * @readonly
		 * @member {module:ui/dropdown/dropdownpanelview~DropdownPanelView} #panelView
		 */
		this.panelView = panelView;

		/**
		 * Controls whether the dropdown view is open, which also means its
		 * {@link #panelView panel} is visible.
		 *
		 * @observable
		 * @member {Boolean} #isOpen
		 */
		this.set( 'isOpen', false );

		this.template = new Template( {
			tag: 'div',

			attributes: {
				class: [
					'ck-dropdown'
				]
			},

			children: [
				buttonView,
				panelView
			]
		} );

		// Toggle the the dropdown when it's button has been clicked.
		this.listenTo( buttonView, 'execute', () => this.isOpen = !this.isOpen );

		// Toggle the visibility of the panel when the dropdown becomes open.
		panelView.bind( 'isVisible' ).to( this, 'isOpen' );

		/**
		 * The label of the dropdown.
		 *
		 * @observable
		 * @member {String} #label
		 */

		/**
		 * Controls whether the dropdown is enabled (can be clicked).
		 *
		 * @observable
		 * @member {Boolean} #isEnabled
		 */

		/**
		 * Controls whether the {@link #buttonView} is "pushed".
		 *
		 * @observable
		 * @member {Boolean} #isOn
		 */

		/**
		 * (Optional) Whether the label of the dropdown is visible. See {@link module:ui/button/buttonview~ButtonView#withText}.
		 *
		 * @observable
		 * @member {Boolean} #withText
		 */
	}
}
