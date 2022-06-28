import type { BoxProps } from "@chakra-ui/react";
import { Box, chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";

import { CloseIcon, DragIcon, ResizeIcon } from "components/icons";
import { useItemContext } from "components/item";
import { ScrollableBox } from "components/scrollable-box";
import { useWindowManager } from "components/window-manager";
import { useSize } from "lib/hooks";

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

interface WindowProps extends BoxProps {
  motionBoxProps?: React.ComponentPropsWithoutRef<typeof MotionBox>;
  contentBoxProps?: BoxProps;
  title?: string;
}

let firstResize = true;

export const Window = ({
  motionBoxProps,
  contentBoxProps,
  children,
  title,
  ...rest
}: WindowProps) => {
  const { id, isOpen, onClose } = useItemContext();
  const { windowLayerRef, focus, windowStack } = useWindowManager();

  // Motion props
  const [drag, setDrag] = useState(false);
  const [resize, setResize] = useState(false);
  const windowContainerRef = useRef(null);
  const size = useSize(windowContainerRef);
  const height = useMotionValue(size.height);
  const width = useMotionValue(size.width);
  const heightBeforeResize = useRef(size.height);
  const widthBeforeResize = useRef(size.width);

  if (windowContainerRef.current && height.get() === 0 && width.get() === 0) {
    height.set(size.height);
    width.set(size.width);
  }

  // TODO find a less ugly way to refresh component. The problem solved by the
  // following segment is that windowLayerRef will be null at first and the
  // defaultIsOpen from useDisclosure won't be honored. This state/effect
  // produces a rerender that picks up the correct values. But it's ugly and you
  // know it.
  const [, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (windowLayerRef.current && isOpen) {
    return ReactDOM.createPortal(
      <Box
        ref={windowContainerRef}
        position="absolute"
        zIndex={windowStack[id]}
        minH="150px"
        minW="200px"
        {...rest}
      >
        <MotionBox
          drag={drag}
          dragConstraints={windowLayerRef}
          dragElastic={false}
          dragMomentum={false}
          onDragEnd={() => setDrag(false)}
          onTapStart={() => focus(id)}
          style={{ height, width }}
          position="absolute"
          top="0"
          left="0"
          display="flex"
          flexDirection="column"
          border="1px solid #f2bebe"
          backgroundColor="#faffff"
          overflow="hidden"
          pb="2"
          boxShadow="2xl"
          userSelect="none"
          pointerEvents="auto"
          minH="150px"
          minW="200px"
          {...motionBoxProps}
        >
          <Box
            display="flex"
            alignItems="start"
            justifyContent="space-between"
            p="2"
            gap="2"
          >
            <MotionBox
              width="2em"
              sx={{ touchAction: "none" }}
              onTapStart={() => setDrag(true)}
              onTap={() => setDrag(false)}
            >
              <DragIcon />
            </MotionBox>
            {title}
            <CloseIcon flex="0 0 auto" onClick={onClose} />
          </Box>
          <ScrollableBox
            overflow="auto"
            userSelect="text"
            px="2"
            gap="2"
            flex="1 1 auto"
            {...contentBoxProps}
            pointerEvents={drag || resize ? "none" : "auto"}
          >
            {children}
          </ScrollableBox>
          <MotionBox
            sx={{ touchAction: "none" }}
            onPanStart={() => {
              setResize(true);
              if (firstResize) {
                firstResize = false;
                heightBeforeResize.current = size.height;
                widthBeforeResize.current = size.width;
              } else {
                heightBeforeResize.current = height.get();
                widthBeforeResize.current = width.get();
              }
            }}
            onPan={(_, { offset }) => {
              height.set(heightBeforeResize.current + offset.y);
              width.set(widthBeforeResize.current + offset.x);
            }}
            onPanEnd={() => setResize(false)}
          >
            <ResizeIcon position="absolute" right="2" bottom="2" />
          </MotionBox>
        </MotionBox>
      </Box>,
      windowLayerRef.current
    );
  }

  return null;
};
