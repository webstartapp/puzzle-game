import { cloneElement, FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, GestureResponderEvent, NativeTouchEvent, PanResponderGestureState, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { TouchEventType } from "./GameEngine";
import DraggableView from "./draggableView";

export interface IEntity {
	  component: FC<any>;
	  position: {
		      x: number;
		      y: number;
		      width: number;
		      height: number;
		      z: number;
		    };
		key?: string;

	styles: ViewStyle;
};

export type EventItem = {
	type: TouchEventType;
	entity: IEntity;
	touch: {
		x: number;
		y: number;
		moveX: number;
		moveY: number;
		snapX: number;
		snapY: number;
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
gridSnaps: {
	x: number;
	y: number;
}
}

declare global {
	var entyties: IEntity[];
}

const EntityRenderer: FC<EntityRendererProps> = ({entities, contentSize, style, system, gridSnaps}) => {
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

	const setEntities = useCallback<(type: TouchEventType, entity: IEntity, gestureState: PanResponderGestureState) => void>((type, entity, gestureState) => {
		if(!system) return;
		const gestureDX = {
			x: gestureState.dx / ratio,
			y: gestureState.dy / ratio,
		};
		const newEntities = system(global.entyties, {
			type: type,
			entity: entity,
			touch: {
				x : entity.position.x + gestureDX.x,
				y: entity.position.y + gestureDX.y,
				moveX: (gestureState.moveX - shift.x) / ratio,
				moveY: (gestureState.moveY - shift.y) / ratio,
				snapX: gridSnaps?.x ? Math.floor((gestureState.moveX - shift.x) / ratio / (contentSize.width / gridSnaps.x)) * (contentSize.width / gridSnaps.x): 0,
				snapY: gridSnaps?.y ? Math.floor((gestureState.moveY - shift.y) / ratio / (contentSize.height / gridSnaps.y)) * (contentSize.height / gridSnaps.y) : 0,
				gridSnaps,
				snappedx: (gestureState.moveY - shift.y) / ratio / gridSnaps.y, 
			},
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
		<View id="gameenf" style={{width: screen.current.width, height: screen.current.height, userSelect: 'none'} as any}>
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
					<DraggableView key={entity.key} entity={entity} setEntities={setEntities} styles={styles[`item_${entity.key}`]} />
				);
				})}
		</View>
	</View>
	);
};

export default EntityRenderer;
