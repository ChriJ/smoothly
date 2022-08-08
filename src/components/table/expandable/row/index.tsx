import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from "@stencil/core"

@Component({
	tag: "smoothly-table-expandable-row",
	styleUrl: "style.css",
	scoped: true,
})
export class TableExpandableRow {
	@Element() element: HTMLSmoothlyTableRowElement
	expansionElement?: HTMLTableRowElement
	@Event() expansionOpen: EventEmitter<HTMLElement>
	@Prop() align: "left" | "center" | "right" = "left"
	@Prop({ mutable: true, reflect: true }) open: boolean
	@State() beginOpen: boolean
	@Watch("open")
	openChanged(value: boolean) {
		if (this.expansionElement)
			this.element.after(this.expansionElement)
	}

	@Listen("click")
	onClick(e: UIEvent) {
		this.open = !this.open
		e.stopPropagation()
	}

	componentDidRender(): void {
		this.expansionOpen.emit(this.expansionElement)
		if (this.expansionElement && this.open)
			this.element.after(this.expansionElement)
	}
	render() {
		return (
			<Host style={{ textAlign: this.align }}>
				<slot></slot>
				<smoothly-table-cell>
					<smoothly-icon name="chevron-forward" size="tiny"></smoothly-icon>
				</smoothly-table-cell>
				<tr ref={e => (this.expansionElement = e)}>
					<td colSpan={500} class={!this.open ? "hide" : ""}>
						<div class="slot-detail">
							<slot name="detail"></slot>
						</div>
					</td>
				</tr>
			</Host>
		)
	}
}