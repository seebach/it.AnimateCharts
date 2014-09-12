/**
 * @creator Erik Wetterberg (ewg)
 * @modifier @owner Torben Seebach itelligence
 * @contributer Patrik Lundblad
 */

define( [], function () {

	return {
		type: "items",
		component: "accordion",
		items: {
			dimensions: {
				uses: "dimensions",
				min: 1,
				max: 1
			},
			sorting: {
				uses: "sorting"
			},
			settings: {
				uses: "settings",
				items: {
				customProp2: {
						ref: "qDef.Seconds",
						label: "Second between shifts",
						//component: "bo",
						type: "string",
						defaultValue: "5"
					}					
				}
			}
		}
	};

} );
