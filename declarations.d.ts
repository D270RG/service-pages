import { ITranslateObject } from 'p@/common-types/common-types';

// declaration.d.ts
declare module '*.scss' {
	const content: Record<string, string>;
	export default content;
}
