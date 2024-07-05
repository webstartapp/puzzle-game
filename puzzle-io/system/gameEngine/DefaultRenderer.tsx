import { cloneElement, FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, GestureResponderEvent, NativeTouchEvent, PanResponderGestureState, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { TouchEventType } from "./GameEngine";
import DraggableView from "./draggableView";

export interface IEntity {
	  component: ReactElement;
	  position: {
		      x: number;
		      y: number;
		      width: number;
		      height: number;
		      z: number;
		    };
		world: {
			x: number;
			y: number;
			width: number;
			height: number;
		}
		key?: string;

	styles: ViewStyle;
};

export type EventItem = {
	type: TouchEventType;
	entity: IEntity;
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
system?: (entities: IEntity[], event: EventItem) => IEntity[];
}

const EntityRenderer: FC<EntityRendererProps> = ({entities, contentSize, style, system}) => {
	const screen = useRef(Dimensions.get("window"));
	const [entityList, setEntityList] = useState<IEntity[]>([]);
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
		global.entyties = Object.keys(entities)
			.filter(key => entities[key].component)
			.map(key => {
				return {
					...entities[key],
					key,
					world: {
						x: entities[key].position.x * ratio + shift.x,
						y: entities[key].position.y * ratio + shift.y,
						width: entities[key].position.width * ratio,
						height: entities[key].position.height * ratio,
					},
				};
			});

		setEntityList(global.entyties);
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
		let localRegisteredEntity: IEntity = undefined as never;
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
					width: entity.position?.width || 0,
					height: entity.position?.height || 0,
					left: entity.position?.x || 0,
					top: entity.position?.y || 0,
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
				const newEntries = system?.(entityList, { type, entity: localRegisteredEntity, touch: pivot });
				if(newEntries) {
					setEntityList(newEntries);
				}
				if(localRegisteredEntity!==undefined) {
					setRegisteredEntityId(localRegisteredEntity?.key);
				}
				return;
			}
			if(type === 'end') {
				const newEntries = system?.(entityList, { type, entity: localRegisteredEntity, touch: pivot});
				if(newEntries) {
					setEntityList(newEntries);
				}
				setRegisteredEntityId(undefined);
				return;
			}
			if(type === 'move' && registeredEntityId) {
				const entity = entityList.find(entity => entity.key === registeredEntityId);
				if(entity) {
					const newEntries = system?.(entityList, { type, entity, touch: pivot });
					if(newEntries) {
						setEntityList(newEntries);
					}
				}
			}
		}
	}, [entityList, ratio, shift, registeredEntityId]);

	const setEntities = useCallback<(entity: IEntity, e: GestureResponderEvent, gestureState: PanResponderGestureState, pan: Animated.ValueXY) => void>((entity, e, gestureState, pan) => {
		if(!system) return;
		const gestureDX = {
			x: gestureState.dx / ratio,
			y: gestureState.dy / ratio,
		};
		const newEntities = system(global.entyties, {
			type: "move",
			entity: entity,
			touch: {
				x : entity.position.x + gestureDX.x,
				y: entity.position.y + gestureDX.y,
				moveX: (gestureState.moveX - shift.x) / ratio,
				moveY: (gestureState.moveY - shift.y) / ratio,
			}
		});
		global.entyties = newEntities.map(entityData => {
			if(entity.key !== entityData.key) {
				return entityData;
			}
			return {
				...entityData,
				world: {
					x: entityData.position.x * ratio + shift.x,
					y: entityData.position.y * ratio + shift.y,
					width: entityData.position.width * ratio,
					height: entityData.position.height * ratio,
				},
			};
		})
		setEntityList([ ...global.entyties ]);
	}, [JSON.stringify(entityList.map(({position})=>{position})), system, ratio]);

	return (
		<View id="gameenf" style={{width: screen.current.width, height: screen.current.height, userSelect: 'none'}}>
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
					<DraggableView entity={entity} setEntities={setEntities} styles={styles[`item_${entity.key}`]} entities={entityList}/>
				);
				})}
		</View>
	</View>
	);
};

export default EntityRenderer;
