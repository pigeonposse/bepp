import{a as Main$4,d as Main$5,e as componentTypes,b as browser,m as messageStore,f as messagesIds,g as Main$6,h as Main$7,i as data,j as Main$8,C as Content,c as contentIds,o as optionsTabs,M as Main$9,r as renderComponentOnDOMContentLoaded}from"../../content.js";import{S as SvelteComponent,i as init,s as safe_not_equal,e as ensure_array_like,b as element,f as space,g as attr,h as insert,j as append,t as transition_in,k as group_outros,l as check_outros,a as transition_out,n as detach,o as destroy_each,p as text,q as listen,r as set_data,u as empty,c as create_component,m as mount_component,d as destroy_component,v as is_function,w as construct_svelte_component,x as get_spread_update,y as get_spread_object,z as assign,A as component_subscribe,B as noop}from"../../vendor.js";function get_each_context$1(ctx,list,i){const child_ctx=ctx.slice();return child_ctx[6]=list[i],child_ctx}function get_each_context_1(ctx,list,i){const child_ctx=ctx.slice();return child_ctx[6]=list[i],child_ctx}function create_if_block_1(ctx){let indicator,current;return indicator=new Main$4({}),{c(){create_component(indicator.$$.fragment)},m(target,anchor){mount_component(indicator,target,anchor),current=!0},i(local){current||(transition_in(indicator.$$.fragment,local),current=!0)},o(local){transition_out(indicator.$$.fragment,local),current=!1},d(detaching){destroy_component(indicator,detaching)}}}function create_each_block_1(ctx){let button,t0,t1,t2,button_class_value,button_title_value,current,mounted,dispose,t0_value=ctx[6].name+"",if_block=ctx[6].indicator&&create_if_block_1();return{c(){button=element("button"),t0=text(t0_value),t1=space(),if_block&&if_block.c(),t2=space(),attr(button,"class",button_class_value=tabHeaderBtnClass+" "+ctx[4].neutral+" "+(ctx[0]===ctx[6].value?"bg-primary-500 text-gray-800 "+ctx[4].primary:"bg-gray-200 dark:bg-gray-500")+" "+ctx[3]),attr(button,"title",button_title_value=ctx[6].desc)},m(target,anchor){insert(target,button,anchor),append(button,t0),append(button,t1),if_block&&if_block.m(button,null),append(button,t2),current=!0,mounted||(dispose=listen(button,"click",(function(){is_function(ctx[5](ctx[6].value))&&ctx[5](ctx[6].value).apply(this,arguments)})),mounted=!0)},p(new_ctx,dirty){ctx=new_ctx,(!current||2&dirty)&&t0_value!==(t0_value=ctx[6].name+"")&&set_data(t0,t0_value),ctx[6].indicator?if_block?2&dirty&&transition_in(if_block,1):(if_block=create_if_block_1(),if_block.c(),transition_in(if_block,1),if_block.m(button,t2)):if_block&&(group_outros(),transition_out(if_block,1,1,(()=>{if_block=null})),check_outros()),(!current||11&dirty&&button_class_value!==(button_class_value=tabHeaderBtnClass+" "+ctx[4].neutral+" "+(ctx[0]===ctx[6].value?"bg-primary-500 text-gray-800 "+ctx[4].primary:"bg-gray-200 dark:bg-gray-500")+" "+ctx[3]))&&attr(button,"class",button_class_value),(!current||2&dirty&&button_title_value!==(button_title_value=ctx[6].desc))&&attr(button,"title",button_title_value)},i(local){current||(transition_in(if_block),current=!0)},o(local){transition_out(if_block),current=!1},d(detaching){detaching&&detach(button),if_block&&if_block.d(),mounted=!1,dispose()}}}function create_if_block$2(ctx){let div,switch_instance,t,current;const switch_instance_spread_levels=[ctx[6].props];var switch_value=ctx[6].component;function switch_props(ctx2,dirty){let switch_instance_props={};if(void 0!==dirty&&2&dirty)switch_instance_props=get_spread_update(switch_instance_spread_levels,[get_spread_object(ctx2[6].props)]);else for(let i=0;i<switch_instance_spread_levels.length;i+=1)switch_instance_props=assign(switch_instance_props,switch_instance_spread_levels[i]);return{props:switch_instance_props}}return switch_value&&(switch_instance=construct_svelte_component(switch_value,switch_props(ctx))),{c(){div=element("div"),switch_instance&&create_component(switch_instance.$$.fragment),t=space()},m(target,anchor){insert(target,div,anchor),switch_instance&&mount_component(switch_instance,div,null),append(div,t),current=!0},p(ctx2,dirty){if(2&dirty&&switch_value!==(switch_value=ctx2[6].component)){if(switch_instance){group_outros();const old_component=switch_instance;transition_out(old_component.$$.fragment,1,0,(()=>{destroy_component(old_component,1)})),check_outros()}switch_value?(switch_instance=construct_svelte_component(switch_value,switch_props(ctx2,dirty)),create_component(switch_instance.$$.fragment),transition_in(switch_instance.$$.fragment,1),mount_component(switch_instance,div,t)):switch_instance=null}else if(switch_value){const switch_instance_changes=2&dirty?get_spread_update(switch_instance_spread_levels,[get_spread_object(ctx2[6].props)]):{};switch_instance.$set(switch_instance_changes)}},i(local){current||(switch_instance&&transition_in(switch_instance.$$.fragment,local),current=!0)},o(local){switch_instance&&transition_out(switch_instance.$$.fragment,local),current=!1},d(detaching){detaching&&detach(div),switch_instance&&destroy_component(switch_instance)}}}function create_each_block$1(ctx){let if_block_anchor,current,if_block=ctx[0]===ctx[6].value&&create_if_block$2(ctx);return{c(){if_block&&if_block.c(),if_block_anchor=empty()},m(target,anchor){if_block&&if_block.m(target,anchor),insert(target,if_block_anchor,anchor),current=!0},p(ctx2,dirty){ctx2[0]===ctx2[6].value?if_block?(if_block.p(ctx2,dirty),3&dirty&&transition_in(if_block,1)):(if_block=create_if_block$2(ctx2),if_block.c(),transition_in(if_block,1),if_block.m(if_block_anchor.parentNode,if_block_anchor)):if_block&&(group_outros(),transition_out(if_block,1,1,(()=>{if_block=null})),check_outros())},i(local){current||(transition_in(if_block),current=!0)},o(local){transition_out(if_block),current=!1},d(detaching){detaching&&detach(if_block_anchor),if_block&&if_block.d(detaching)}}}function create_fragment$3(ctx){let div1,div0,t,div1_class_value,current,each_value_1=ensure_array_like(ctx[1]),each_blocks_1=[];for(let i=0;i<each_value_1.length;i+=1)each_blocks_1[i]=create_each_block_1(get_each_context_1(ctx,each_value_1,i));const out=i=>transition_out(each_blocks_1[i],1,1,(()=>{each_blocks_1[i]=null}));let each_value=ensure_array_like(ctx[1]),each_blocks=[];for(let i=0;i<each_value.length;i+=1)each_blocks[i]=create_each_block$1(get_each_context$1(ctx,each_value,i));const out_1=i=>transition_out(each_blocks[i],1,1,(()=>{each_blocks[i]=null}));return{c(){div1=element("div"),div0=element("div");for(let i=0;i<each_blocks_1.length;i+=1)each_blocks_1[i].c();t=space();for(let i=0;i<each_blocks.length;i+=1)each_blocks[i].c();attr(div0,"class",tabHeaderClass),attr(div1,"class",div1_class_value=tabClass+" "+ctx[2])},m(target,anchor){insert(target,div1,anchor),append(div1,div0);for(let i=0;i<each_blocks_1.length;i+=1)each_blocks_1[i]&&each_blocks_1[i].m(div0,null);append(div1,t);for(let i=0;i<each_blocks.length;i+=1)each_blocks[i]&&each_blocks[i].m(div1,null);current=!0},p(ctx2,[dirty]){if(59&dirty){let i;for(each_value_1=ensure_array_like(ctx2[1]),i=0;i<each_value_1.length;i+=1){const child_ctx=get_each_context_1(ctx2,each_value_1,i);each_blocks_1[i]?(each_blocks_1[i].p(child_ctx,dirty),transition_in(each_blocks_1[i],1)):(each_blocks_1[i]=create_each_block_1(child_ctx),each_blocks_1[i].c(),transition_in(each_blocks_1[i],1),each_blocks_1[i].m(div0,null))}for(group_outros(),i=each_value_1.length;i<each_blocks_1.length;i+=1)out(i);check_outros()}if(3&dirty){let i;for(each_value=ensure_array_like(ctx2[1]),i=0;i<each_value.length;i+=1){const child_ctx=get_each_context$1(ctx2,each_value,i);each_blocks[i]?(each_blocks[i].p(child_ctx,dirty),transition_in(each_blocks[i],1)):(each_blocks[i]=create_each_block$1(child_ctx),each_blocks[i].c(),transition_in(each_blocks[i],1),each_blocks[i].m(div1,null))}for(group_outros(),i=each_value.length;i<each_blocks.length;i+=1)out_1(i);check_outros()}(!current||4&dirty&&div1_class_value!==(div1_class_value=tabClass+" "+ctx2[2]))&&attr(div1,"class",div1_class_value)},i(local){if(!current){for(let i=0;i<each_value_1.length;i+=1)transition_in(each_blocks_1[i]);for(let i=0;i<each_value.length;i+=1)transition_in(each_blocks[i]);current=!0}},o(local){each_blocks_1=each_blocks_1.filter(Boolean);for(let i=0;i<each_blocks_1.length;i+=1)transition_out(each_blocks_1[i]);each_blocks=each_blocks.filter(Boolean);for(let i=0;i<each_blocks.length;i+=1)transition_out(each_blocks[i]);current=!1},d(detaching){detaching&&detach(div1),destroy_each(each_blocks_1,detaching),destroy_each(each_blocks,detaching)}}}let tabClass="m-4 text-white",tabHeaderClass="flex flex-row items-center justify-center",tabHeaderBtnClass="px-4 py-2 m-2 rounded-xl font-bold text-base relative";function instance$3($$self,$$props,$$invalidate){let{items:items}=$$props,{activeTabValue:activeTabValue}=$$props,{customClasses:customClasses=""}=$$props,{customBtnClasses:customBtnClasses=""}=$$props;activeTabValue||(activeTabValue=items[0].value);return $$self.$$set=$$props2=>{"items"in $$props2&&$$invalidate(1,items=$$props2.items),"activeTabValue"in $$props2&&$$invalidate(0,activeTabValue=$$props2.activeTabValue),"customClasses"in $$props2&&$$invalidate(2,customClasses=$$props2.customClasses),"customBtnClasses"in $$props2&&$$invalidate(3,customBtnClasses=$$props2.customBtnClasses)},[activeTabValue,items,customClasses,customBtnClasses,{neutral:"hover:shadow-[0_0_20px_0px_rgba(0,0,0,0.3)] hover:shadow-gray-200/30 dark:hover:shadow-gray-500/30",primary:"shadow-[0_0_20px_0px_rgba(0,0,0,0.3)] shadow-primary-500/30 hover:shadow-primary-500/30"},tabValue=>()=>$$invalidate(0,activeTabValue=tabValue)]}let Main$3=class extends SvelteComponent{constructor(options){super(),init(this,options,instance$3,create_fragment$3,safe_not_equal,{items:1,activeTabValue:0,customClasses:2,customBtnClasses:3})}};function get_each_context(ctx,list,i){const child_ctx=ctx.slice();return child_ctx[1]=list[i],child_ctx}function create_else_block(ctx){let span;return{c(){span=element("span"),span.textContent=`${browser.i18n.getMessage("opts_debug_none")}`,attr(span,"class","opacity-50 py-4")},m(target,anchor){insert(target,span,anchor)},p:noop,i:noop,o:noop,d(detaching){detaching&&detach(span)}}}function create_if_block$1(ctx){let each_1_anchor,current,each_value=ensure_array_like(ctx[0]),each_blocks=[];for(let i=0;i<each_value.length;i+=1)each_blocks[i]=create_each_block(get_each_context(ctx,each_value,i));const out=i=>transition_out(each_blocks[i],1,1,(()=>{each_blocks[i]=null}));return{c(){for(let i=0;i<each_blocks.length;i+=1)each_blocks[i].c();each_1_anchor=empty()},m(target,anchor){for(let i=0;i<each_blocks.length;i+=1)each_blocks[i]&&each_blocks[i].m(target,anchor);insert(target,each_1_anchor,anchor),current=!0},p(ctx2,dirty){if(1&dirty){let i;for(each_value=ensure_array_like(ctx2[0]),i=0;i<each_value.length;i+=1){const child_ctx=get_each_context(ctx2,each_value,i);each_blocks[i]?(each_blocks[i].p(child_ctx,dirty),transition_in(each_blocks[i],1)):(each_blocks[i]=create_each_block(child_ctx),each_blocks[i].c(),transition_in(each_blocks[i],1),each_blocks[i].m(each_1_anchor.parentNode,each_1_anchor))}for(group_outros(),i=each_value.length;i<each_blocks.length;i+=1)out(i);check_outros()}},i(local){if(!current){for(let i=0;i<each_value.length;i+=1)transition_in(each_blocks[i]);current=!0}},o(local){each_blocks=each_blocks.filter(Boolean);for(let i=0;i<each_blocks.length;i+=1)transition_out(each_blocks[i]);current=!1},d(detaching){detaching&&detach(each_1_anchor),destroy_each(each_blocks,detaching)}}}function create_default_slot_2(ctx){let t,t_value=ctx[1].time+"";return{c(){t=text(t_value)},m(target,anchor){insert(target,t,anchor)},p(ctx2,dirty){1&dirty&&t_value!==(t_value=ctx2[1].time+"")&&set_data(t,t_value)},d(detaching){detaching&&detach(t)}}}function create_default_slot_1(ctx){let span,t0,t1,badge,t2,current,t0_value=ctx[1].message+"";return badge=new Main$7({props:{$$slots:{default:[create_default_slot_2]},$$scope:{ctx:ctx}}}),{c(){span=element("span"),t0=text(t0_value),t1=space(),create_component(badge.$$.fragment),t2=space()},m(target,anchor){insert(target,span,anchor),append(span,t0),insert(target,t1,anchor),mount_component(badge,target,anchor),insert(target,t2,anchor),current=!0},p(ctx2,dirty){(!current||1&dirty)&&t0_value!==(t0_value=ctx2[1].message+"")&&set_data(t0,t0_value);const badge_changes={};17&dirty&&(badge_changes.$$scope={dirty:dirty,ctx:ctx2}),badge.$set(badge_changes)},i(local){current||(transition_in(badge.$$.fragment,local),current=!0)},o(local){transition_out(badge.$$.fragment,local),current=!1},d(detaching){detaching&&(detach(span),detach(t1),detach(t2)),destroy_component(badge,detaching)}}}function create_each_block(ctx){let not,current;return not=new Main$6({props:{type:ctx[1].type,$$slots:{default:[create_default_slot_1]},$$scope:{ctx:ctx}}}),{c(){create_component(not.$$.fragment)},m(target,anchor){mount_component(not,target,anchor),current=!0},p(ctx2,dirty){const not_changes={};1&dirty&&(not_changes.type=ctx2[1].type),17&dirty&&(not_changes.$$scope={dirty:dirty,ctx:ctx2}),not.$set(not_changes)},i(local){current||(transition_in(not.$$.fragment,local),current=!0)},o(local){transition_out(not.$$.fragment,local),current=!1},d(detaching){destroy_component(not,detaching)}}}function create_default_slot$1(ctx){let current_block_type_index,if_block,if_block_anchor,current;const if_block_creators=[create_if_block$1,create_else_block],if_blocks=[];function select_block_type(ctx2,dirty){return ctx2[0].length>0?0:1}return current_block_type_index=select_block_type(ctx),if_block=if_blocks[current_block_type_index]=if_block_creators[current_block_type_index](ctx),{c(){if_block.c(),if_block_anchor=empty()},m(target,anchor){if_blocks[current_block_type_index].m(target,anchor),insert(target,if_block_anchor,anchor),current=!0},p(ctx2,dirty){let previous_block_index=current_block_type_index;current_block_type_index=select_block_type(ctx2),current_block_type_index===previous_block_index?if_blocks[current_block_type_index].p(ctx2,dirty):(group_outros(),transition_out(if_blocks[previous_block_index],1,1,(()=>{if_blocks[previous_block_index]=null})),check_outros(),if_block=if_blocks[current_block_type_index],if_block?if_block.p(ctx2,dirty):(if_block=if_blocks[current_block_type_index]=if_block_creators[current_block_type_index](ctx2),if_block.c()),transition_in(if_block,1),if_block.m(if_block_anchor.parentNode,if_block_anchor))},i(local){current||(transition_in(if_block),current=!0)},o(local){transition_out(if_block),current=!1},d(detaching){detaching&&detach(if_block_anchor),if_blocks[current_block_type_index].d(detaching)}}}function create_fragment$2(ctx){let option,current;return option=new Main$5({props:{type:componentTypes.option.section,title:{value:browser.i18n.getMessage("opts_debug"),desc:browser.i18n.getMessage("opts_debug_desctiption")},customClasses:"max-h-[60vh]",$$slots:{default:[create_default_slot$1]},$$scope:{ctx:ctx}}}),{c(){create_component(option.$$.fragment)},m(target,anchor){mount_component(option,target,anchor),current=!0},p(ctx2,[dirty]){const option_changes={};17&dirty&&(option_changes.$$scope={dirty:dirty,ctx:ctx2}),option.$set(option_changes)},i(local){current||(transition_in(option.$$.fragment,local),current=!0)},o(local){transition_out(option.$$.fragment,local),current=!1},d(detaching){destroy_component(option,detaching)}}}function instance$2($$self,$$props,$$invalidate){let $messageStore;return component_subscribe($$self,messageStore,($$value=>$$invalidate(0,$messageStore=$$value))),browser.runtime.onMessage.addListener((message=>{message.type===messagesIds.log&&messageStore.add(message.data)})),[$messageStore]}let Main$2=class extends SvelteComponent{constructor(options){super(),init(this,options,instance$2,create_fragment$2,safe_not_equal,{})}};function create_fragment$1(ctx){let if_block_anchor,current,if_block=data&&function(ctx){let options,current;return options=new Main$8({props:{data:data}}),{c(){create_component(options.$$.fragment)},m(target,anchor){mount_component(options,target,anchor),current=!0},i(local){current||(transition_in(options.$$.fragment,local),current=!0)},o(local){transition_out(options.$$.fragment,local),current=!1},d(detaching){destroy_component(options,detaching)}}}();return{c(){if_block&&if_block.c(),if_block_anchor=empty()},m(target,anchor){if_block&&if_block.m(target,anchor),insert(target,if_block_anchor,anchor),current=!0},p:noop,i(local){current||(transition_in(if_block),current=!0)},o(local){transition_out(if_block),current=!1},d(detaching){detaching&&detach(if_block_anchor),if_block&&if_block.d(detaching)}}}function instance$1($$self){return[]}let Main$1=class extends SvelteComponent{constructor(options){super(),init(this,options,instance$1,create_fragment$1,safe_not_equal,{})}};function create_default_slot(ctx){let tabs,current;return tabs=new Main$3({props:{items:[{name:browser.i18n.getMessage("opts_tabs_filters"),value:optionsTabs.filtersSidebar,component:Main$1},{name:browser.i18n.getMessage("opts_tabs_allowedSites"),value:optionsTabs.allowSites,component:Main$9},{name:browser.i18n.getMessage("opts_tabs_debug"),value:optionsTabs.debug,component:Main$2}]}}),{c(){create_component(tabs.$$.fragment)},m(target,anchor){mount_component(tabs,target,anchor),current=!0},p:noop,i(local){current||(transition_in(tabs.$$.fragment,local),current=!0)},o(local){transition_out(tabs.$$.fragment,local),current=!1},d(detaching){destroy_component(tabs,detaching)}}}function create_fragment(ctx){let content,current;return content=new Content({props:{type:contentIds.options,$$slots:{default:[create_default_slot]},$$scope:{ctx:ctx}}}),{c(){create_component(content.$$.fragment)},m(target,anchor){mount_component(content,target,anchor),current=!0},p(ctx2,[dirty]){const content_changes={};1&dirty&&(content_changes.$$scope={dirty:dirty,ctx:ctx2}),content.$set(content_changes)},i(local){current||(transition_in(content.$$.fragment,local),current=!0)},o(local){transition_out(content.$$.fragment,local),current=!1},d(detaching){destroy_component(content,detaching)}}}function instance($$self){return[]}class Main4 extends SvelteComponent{constructor(options){super(),init(this,options,instance,create_fragment,safe_not_equal,{})}}try{renderComponentOnDOMContentLoaded({componentClass:Main4,querySelelctor:"#pp-s8-content"})}catch(e){console.error(e)}
