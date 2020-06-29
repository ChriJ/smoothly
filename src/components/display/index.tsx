// tslint:disable-next-line: no-implicit-dependencies
import { Component, Prop, h } from "@stencil/core"
import { Currency, CountryCode } from "isoly"
import { Type, format } from "tidily"

@Component({
	tag: "smoothly-display",
	styleUrl: "style.css",
	scoped: true,
})
export class SmoothlyDisplay {
	@Prop() type: Type
	@Prop() value?: any
	@Prop() currency?: Currency
	@Prop() country?: CountryCode.Alpha2
	render() {
		let result: string | HTMLElement
		const type = this.type
		switch (type) {
			default:
				result = format(this.value, type)
				break
			case "email":
				result = <a href={ "mailto:" + this.value  }>{ format(this.value, type) }</a>
				break
			case "phone":
				result = <a href={ "tel:" + this.value }>{ format(this.value, type, this.country) }</a>
				break
			case "postal-code":
				result = format(this.value, type, this.country)
				break
			case "price":
				result = format(this.value, type, this.currency)
				break
		}
		return result
	}
}