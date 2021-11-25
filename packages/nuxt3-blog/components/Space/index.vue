<script lang="tsx">
// 有bug，如果Space组件内的元素使用v-for渲染，会全部聚集到一个div.q-space__item元素内
import { defineComponent, computed, useSlots, onMounted, PropType } from "vue";
export type SizeType = "small" | "middle" | "large" | undefined;
export type SpaceSize = SizeType | number;
const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};
const getNumberSize = (size: SpaceSize) => {
  return typeof size === "string" ? spaceSize[size] : size || 0;
};

export default defineComponent({
  name: 'Space',
  props: {
    size: {
      type: [String, Array] as PropType<SpaceSize | [SpaceSize, SpaceSize]>,
      default: spaceSize.small
    },
    direction: {
      type: String as PropType<"horizontal" | "vertical">,
      default: 'horizontal'
    },
    align: {
      type: String as PropType<"start" | "end" | "center" | "baseline">
    },
    split: {
      type: String,
      default: () => null
    },
    wrap: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const slots = useSlots();

    const { size, direction, align, split, wrap, ...otherProps } = props

    const [horizontalSize, verticalSize] = computed(() => {
      return (
        (Array.isArray(size) ? size : [size, size]) as [SpaceSize, SpaceSize]
      ).map((item) => getNumberSize(item));
    }).value;

    // const items = slots?.default?.().children

    const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align 
    let gapStyle: string = `column-gap: ${horizontalSize}px; row-gap: ${verticalSize}px;`
    
    if (wrap) {
      gapStyle += `flex-wrap: wrap;`
    }

    onMounted(() => {
      console.log("mounted");
      console.log(horizontalSize, verticalSize);
    });

    return () => {
      const items = slots?.default?.()
      console.log(items)

      if (!Array.isArray(items) || items.length === 0) {
        return null
      }
      return (
        // @ts-ignore
        <div class={['q-space', `q-space--${direction}`, `q-space--align-${mergedAlign}`]} style={gapStyle}>
          {
            items.map((item, index) => {
              return (
                // @ts-ignore
                <div class="q-space__item">
                  {item}
                  {index < items.length - 1 && split && (
                    // @ts-ignore
                    <span class={`q-space__split`}>
                      {split}
                    </span>
                  )}
                </div>
              )
            })
          }
        </div>
      )
    }
  }
})
</script>

<style lang="scss">
.q-space {
  display: inline-flex;

  &--vertical {
    flex-direction: column;
  }

  &--align {
    &-center {
      align-items: center;
    }
    &-start {
      align-items: flex-start;
    }
    &-end {
      align-items: flex-end;
    }
    &-baseline {
      align-items: baseline;
    }
  }

  &__item {
  }
  &__split {
  }
}
</style>