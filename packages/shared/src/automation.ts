// V2 Automation types

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'agent' | 'condition' | 'tool' | 'delay' | 'loop' | 'approval' | 'notification' | 'end';
  data: Record<string, any>;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  condition?: string;
}

expÛÜ[\™˜XÙHÛÜšÙ›İÈÂˆYˆİš[™ÎÂˆ˜[YNˆİš[™ÎÂˆ\ØÜš\[Ûˆİš[™ÎÂˆ›Ù\ÎˆÛÜšÙ›İÓ›ÙV×NÂˆYÙ\ÎˆÛÜšÙ›İÑYÙV×NÂˆ[˜X›Yˆ8›ÛÛX[ÂˆÜ™X]Y]ˆİš[™ÎÂŸB‚™^ÛÜ[\™˜XÙH]]ÛX]VãÕG&–vâÆW"°¢G—S¢w66†VGVÆRrÂvf–ÆUö6†ævRrÂvv—EöWfVçBrÂwvV&†öö²rÂwfö–6RrÂvÖçVÂrÂwF6µö6ö×ÆWFRs°¢6öæf–s¢&V6÷&CÇ7G&–ærÂç“ã°§Ğ ¦W‡÷'B–çFW&f6RWFöÖF–öä6öæF—F–öâ°¢f–VÆC¢7G&–æs°¢÷W&÷F÷#¢7G&–ÙÂˆ˜[YNˆ[NÂŸB‚™^Ü[\™˜XÙH]]ÛX][ÛXİ[ÛˆÂˆ\Nˆ	Ü[—ØYÙ[	È	Ü[—İÛÛ	È	ÜÙ[™Û›İYšXØ][Û‰È	ØÜ™X]Wİ\ÚÉÈ	Ü[—İÛÜšÙ›İÉÎÂˆÛÛ™šYÎˆ™XÛÜqİš[™Ë[OÂŸB‚™^Ü[\™˜XÙH]]ÛX][ÛˆÂˆYˆİš[™ÎÂˆ˜[YNˆİš[™ÎÂˆšYÙÙ\ˆ]]ÛX][Û•šYÙÙ\ÂˆÛÛ™][ÛœÎˆ]]ÛX][ÛÛÛ™][Û–×NÂˆXİ[ÛœÎˆ]]ÛX][ÛXİ[Û–×NÂˆ[˜X›Yˆ›ÛÛX[Âˆ\İ[Îˆİš[™ÎÂŸB‚™^Ü[\™˜XÙHYÙ[›Ùš[HÂˆ\Nˆİš[™ÎÂˆ˜[YNˆİš[™ÎÂˆ\™ÙTŞ\İ[Nˆİš[™ÎÂˆ[İÙA\ÛÛˆİš[™Ö×NÂˆÇWkLevel: string;
  model: string;
  maxIt¥rations: number;
  timeout: number;
}

export interface AgentCapability {
  type: string;
  desãription: string;
  tools: string[];
  models: string[];
}

export interface MultiAgentPlan {
  id: string;
  taskId: string;
  steps: WorkflowStep[];
  status: string;
}

export interface WorkflowStep  {
  order: number;
  agentType: string;
  description: string;
  toolName ?: string;
  dependsOn?: number[];
  status: string;
  result?: string;
}

export interface WorkflowResult {
  success: boolean;
  output: string;
  steps: { order: number; agentType: string; status: string; result?: string }[];
  duration: number;
}