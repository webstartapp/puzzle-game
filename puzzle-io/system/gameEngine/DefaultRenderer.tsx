import { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, GestureResponderEvent, NativeTouchEvent, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { TouchEventType } from "./GameEngine";

export interface IEntity {
	  component: ReactNode;
	  position: {
		      x: number;
		      y: number;
		      width: number;
		      height: number;
		      z: number;
		    };
	styles: ViewStyle;
};
export type EntityItem = IEntity & { key: string };

export type EventItem = {
	type: TouchEventType;
	id: string;
	touch: {
		x: number;
		y: number;
	}
};

type EntityRendererProps = {
	entities: Record<string, IEntity>,
	contentSize: {
	width: number;
	height: number;
}
style: ViewStyle;
system?: (entities: EntityItem[], event: EventItem) => EntityItem[];
}

const EntityRenderer: FC<EntityRendererProps> = ({entities, contentSize, style, system}) => {
	const screen = useRef(Dimensions.get("window"));
	const [entityList, setEntityList] = useState<EntityItem[]>([]);
	const [registeredEntityId, setRegisteredEntityId] = useState<string>();
	
	const ratio = useMemo(() => {
		const ratioOfScreen = screen.current.width / screen.current.height;
		const ratioOfGame = contentSize.width / contentSize.height;
		if (ratioOfScreen > ratioOfGame) {
			return screen.current.height / contentSize.height;
		} else {
			return screen.current.width / contentSize.width;
		}
	}, [contentSize, screen]);
	
	useEffect(()=>{
		setEntityList(Object.keys(entities)
			.filter(key => entities[key].component)
			.map(key => {
				return {
					...entities[key],
					key,
				};
			}));
	}, [entities]);
	const shift = {
		x: (screen.current.width - contentSize.width * ratio) / 2,
		y: (screen.current.height - contentSize.height * ratio) / 2,
	};

	const registerTouch = useCallback((type: TouchEventType, e: PointerEvent | GestureResponderEvent) => {
		e.stopPropagation();
		const touches: NativeTouchEvent[] = (e as GestureResponderEvent)?.nativeEvent?.touches || (e as any).touches || [
			{
				pageX: (e as PointerEvent).clientX,
				pageY: (e as PointerEvent).clientY,
			},
		];
		let localRegisteredEntity: EntityItem = undefined as never;
		if(!touches.length) {
			setRegisteredEntityId(undefined);
			return;
		}
		for (let index = 0; index < touches.length; index++) {
			const touch = touches[index];
			const pivot = {
				x: (touch.pageX - shift.x) / ratio,
				y: (touch.pageY - shift.y) / ratio,
			};
			entityList.forEach(entity => {
				const size = {
					width: entity.position.width,
					height: entity.position.height,
					left: entity.position.x,
					top: entity.position.y,
				};
				if (
					pivot.x > size.left &&
					pivot.x < size.left + size.width &&
					pivot.y > size.top &&
					pivot.y < size.top + size.height &&
					((localRegisteredEntity?.position?.z || -1) < entity.position.z)
				) {
					localRegisteredEntity = entity;
				}
			});
			if(type === 'start') {
				const newEntries = system?.(entityList, { type, id: localRegisteredEntity?.key, touch: pivot });
				if(newEntries) {
					setEntityList(newEntries);
				}
				if(localRegisteredEntity!==undefined) {
					setRegisteredEntityId(localRegisteredEntity?.key);
				}
				return;
			}
			if(type === 'end') {
				const newEntries = system?.(entityList, { type, id: localRegisteredEntity?.key, touch: pivot});
				if(newEntries) {
					setEntityList(newEntries);
				}
				setRegisteredEntityId(undefined);
				return;
			}
			if(type === 'move' && registeredEntityId) {
				const entity = entityList.find(entity => entity.key === registeredEntityId);
				if(entity) {
					const newEntries = system?.(entityList, { type, id: entity.key, touch: pivot });
					if(newEntries) {
						setEntityList(newEntries);
					}
				}
			}
		}
	}, [entityList, ratio, shift, registeredEntityId]);

	return (
		<Pressable
			onPressIn={(e)=>registerTouch('start', e)}
			onPressOut={(e)=>registerTouch('end', e)}
			onTouchMove={(e)=>registerTouch('move', e)}
			onResponderRelease={(e)=>registerTouch('end', e)}
			onPointerDown={(e)=>registerTouch('start', e as never)}
			onPointerUp={(e)=>registerTouch('end', e as never)}
			onPointerMove={(e)=>registerTouch('move', e as never)}
		>
			<View style={{width: screen.current.width, height: screen.current.height}}>
				<View
					style={{ ...(style || {}), width: (contentSize.width * ratio), height: (contentSize.height * ratio), left: shift.x, top: shift.y }}
				>
				{entityList.sort((a, b) => (a.position.z || 0) - (b.position.z || 0)).map(entity => {
					const size = {
						width: entity.position.width * ratio,
						height: entity.position.height * ratio,
						left: entity.position.x * ratio,
						top: entity.position.y * ratio,
					};
					const styles = StyleSheet.create({
						[`item_${entity.key}`]: {
								...(entity.styles || {}),
								position: "absolute",
								...size,
						}
					});

					return (
					<View
						key={entity.key}
						style={[
							styles[`item_${entity.key}`],
							size,
						]}
					>
						{entity.component}
					</View>
					);
					})}
			</View>
	</View>
	</Pressable>
	);
};

export default EntityRenderer;
